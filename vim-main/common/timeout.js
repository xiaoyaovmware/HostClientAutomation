'use strict';

var Timeout = {
   //APPLICATION_TIMEOUT: 30000,//900000,
   //LOGOUT_TIMEOUT: 10000,
   //SESSION_TIMEOUT: 10000,
   //
   //COMPONENT_SLEEP_TIMEOUT: 200,
   //WAIT_FOR_REFRESH: 500,
   //
   //
   //VISIBLE_TIMEOUT: 7000,
   //VM_TESTS_TIMEOUT: 200000,
   //
   //
   //VM_EDIT_SAVE_TIMEOUT_LONG: 20000,
   //VM_EDIT_VISIBLE_TIMEOUT: 7000,
   //VM_EDIT_NOTES_TIMEOUT: 3000,
   //
   //WAIT_FOR_ACTION_TO_LOAD: 2000,
   //WAIT_FOR_DELETE_TASK: 1000,
   //WAIT_FOR_VM_TO_LOAD: 3000,

   WAIT_FOR_VISIBLE_TIMEOUT:     5000,
   WAIT_FOR_Message_DISAPPEAR:     10000,
   WAIT_FOR_HOST_REBOOT:         180000,

   WAIT_FOR_REFRESH:             15000,
   WAIT_FOR_LOGOUT:              5000,
   WAIT_FOR_USER_ADD:            10000,  //add
   WAIT_FOR_USER_REMOVE:         10000,  //add

   WAIT_FOR_NETWORK_TASK:        15000,    // add/eelete vSwitch

   COMPONENT_TIMEOUT:            30000,   // Same as  browser.manage().timeouts().implicitlyWait(30000);

   WAIT_FOR_HOST_TASK:           15000,    // e.g. Wait for change advanced-settings, update certificates

   WAIT_FOR_VM_POWER_ON:         15000,
   WAIT_FOR_VM_POWER_OFF:        15000,
   WAIT_FOR_VM_SUSPEND:          15000,
   WAIT_FOR_VM_RESET:            15000,
   WAIT_FOR_VM_EDIT:             15000,
   WAIT_FOR_VM_CREATE:           10000,
   WAIT_FOR_VM_DELETE:           10000,
   WAIT_FOR_VM_RESISTER_ACTION:  5000,

   WAIT_FOR_SNAPSHOT_ACTION:     10000, //Wait for create, revert snapshot timeout

   WAIT_FOR_STORAGE_ACTION:      15000,

   WAIT_FOR_TASK_CHECKING:       15000,
   WAIT_FOR_START_STOP_VIDEO_RECORDING:    10000,


};
module.exports = Timeout;
