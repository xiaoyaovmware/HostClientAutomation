#!/bin/bash

# VMware username, password, home folder for Nimbus ops e.g create worker VM, deploy esxi build from template in Nimbus
#(got from Jenkins parameters)

homeDir=$accountHomeDir
domainUser=$account
domainPasswd=$accountPasswd

# locale to test (got from Jenkins parameters)
locale=$testLocale

# Build info from Buildweb
product1=$buildProduct1
branch1=$buildBranch1
type1=$buildType1
buildNum1='7134301'

product2=$buildProduct2
branch2=$buildBranch2
type2=$buildType2

# Selenium Webdriver IP
seleniumIP='10.160.180.45'

# Test OS and browser
os=$testOS

function error_handle
{
	sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com '/mts/git/bin/nimbus-ctl kill' $workerName
  	sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com '/mts/git/bin/nimbus-ctl kill' $domainUser'-'$runNameESX'.esx.0'
  	sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com '/mts/git/bin/nimbus-ctl kill' $domainUser'-'$runNameESX'.nfs.0'
	exit 1
}

# Delete old testbed deploy result log
sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com 'rm -r -f '$homeDir'/testbedDeployResult/'$locale'_'$branch1'/'


echo
echo ====================================================================
echo                      Create Testbed in Nimbus
echo ====================================================================
echo

# {
	# Get the latest successed release build number from the buildweb with the specified product name and branch
	# e.g. the latest ESXi build number from ESXi server branch vsphere60u2
	# buildNum1=$(curl -sb -H "Accept: application/json" "http://buildapi.eng.vmware.com/ob/build/?product=$product1&branch=$branch1&buildstate=succeeded&buildtype=$type1&_order_by=-endtime&_limit=1" | grep -Po 'id": \K[0-9]+')

	#echo Build_${buildProduct1}_${branch1}_${buildNum1}_${buildProduct2}_${branch2}_${buildNum2}
	# echo Build_${buildProduct1}_${branch1}_${buildNum1}
# } || {
	# error_handle "Failed to get the latest test build number, plaese check product, branch name, Buildweb connection."
# }

  
echo
echo ====================================================================
echo                      Deploy Worker Template
echo ====================================================================
echo
{
	# ssh to nimbus-gateway.eng.vmware.com with VMware account to create a nimbus worker VM
	workerName=$domainUser-worker-$locale-$RANDOM
	sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com '/mts/git/bin/nimbus-genericdeploy --type worker-template '$workerName' --result worker_'$locale'_'$branch1'.json'

	# Get the worker VM IP
	workerIP=$(sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com 'cat worker_'$locale'_'$branch1'.json | '$homeDir'/bin/jq -r .ip4')
} || {
    error_handle "Failed to create worker template or create ESXi VM in Nimbus. Testing cannot start."
}
   

echo
echo ====================================================================
echo                      Deploy ESXi and NFS
echo ====================================================================
echo
{
    # ssh to the nimbus worker VM(with IP got above) to deploy the latest ESXi build
    runNameESX=ob-$buildNum1-$locale-$RANDOM
    sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@$workerIP '/mts/git/bin/nimbus-testbeddeploy --testbedSpecRubyFile '$homeDir'/testbed_automation_hc_esxi.rb --esxBuild ob-'$buildNum1' --runName '$runNameESX' --resultsDir '$homeDir'/testbedDeployResult/'$locale'_'$branch1'/'

    # Get the ESXi VM IP
    esxiIP=$(sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@$workerIP 'cat '$homeDir'/testbedDeployResult/'$locale'_'$branch1'/testbedInfo.json | '$homeDir'/bin/jq -r .esx[0].ip4')
    nfsIP=$(sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@$workerIP 'cat '$homeDir'/testbedDeployResult/'$locale'_'$branch1'/testbedInfo.json | '$homeDir'/bin/jq -r .nfs[0].ip4')

} || {
    error_handle "Failed to create worker template or create ESXi VM in Nimbus. Testing cannot start."
}

    # Create test result output folder
    mkdir -p TestResults

    # Insert Selenium IP and ESXi IP to Protractor configuration file
{
    sed -i "s/seleniumAddress.*$/seleniumAddress: 'http:\/\/${seleniumIP}:4444\/wd\/hub',/g" ./i18n-conf_$locale.js
    sed -i "s/baseUrl.*$/baseUrl: 'https:\/\/${esxiIP}\/ui',/g" ./i18n-conf_$locale.js
} || {
    error_handle "Failed to modify protractor configuration file."
}

echo
echo ---------------------------------------
echo ESXi Branch: 		    ${branch1}
echo ESXi Build Number: 	${buildNum1}
#echo ESX UI Branch: 		${branch2}
#echo ESX UI Build Number: 	${buildNum2}
echo Worker IP:		        ${workerIP}
echo ESXi IP:		        ${esxiIP}
echo NFS IP:                ${nfsIP}
echo Test VM IP:            ${seleniumIP}
echo ---------------------------------------
echo

echo
echo ====================================================================
echo                              Run test cases
echo ====================================================================
echo


protractor --params.nfs.server=${nfsIP} --params.build.branch=${branch1} --params.build.number=${buildNum1} --params.build.type=${type1} --params.dismissCEIPDialog=true --params.raceTrack.log=true ./i18n-conf_$locale.js

echo
echo ======================Kill Created VMs========================
echo

# Delete created VMs in Nimbus
sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com '/mts/git/bin/nimbus-ctl kill' $workerName
sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com '/mts/git/bin/nimbus-ctl kill' $domainUser'-'$runNameESX'.esx.0'
sshpass -p $domainPasswd ssh -o "StrictHostKeyChecking no" ${domainUser}@nimbus-gateway.eng.vmware.com '/mts/git/bin/nimbus-ctl kill' $domainUser'-'$runNameESX'.nfs.0'
    
	
	
