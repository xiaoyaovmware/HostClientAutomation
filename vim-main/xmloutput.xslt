<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">
	<!--<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>-->
	<xsl:template match="/">
		<html>
			<head>
				<link rel="stylesheet" type="text/css" href="htmlReport.css"/>
			</head>
			<body>
				<br/>
				<br/>
				<table border="1" width="90%" align="center" cellpadding="0" cellspacing="0">
					<tbody>
						<tr bgcolor="#43CCFF" style="height:30px">
							<th>Product</th>
							<th>Test Type</th>
							<th>ESX Branch</th>
							<th>ESX Build</th>
							<th>UI Branch</th>
							<th>UI Build</th>
							<th>Language</th>
							<th>OS</th>
							<th>Browser</th>
							<th>Start</th>
							<th>Duration</th>
							<th>Pass</th>
							<th>Fail</th>
						</tr>
						<tr style="height:25px" align="center">
							<td>Host Client</td>
							<td>Regression</td>
							<td>ESXBranchValue</td>
							<td>ESXBuildNumberValue</td>
							<td>UIBranchValue</td>
							<td>UIBuildNumberValue</td>
							<td>LanguageValue</td>
							<td>OSValue</td>
							<td>BrowserValue</td>
							<td><xsl:value-of select="//testsuite[1]/@timestamp"/>
								</td>
							<td align="center">
								<xsl:value-of select="format-number(sum(//testsuite/@time) div 60, '0.0')"/> m</td>
							<td bgcolor="#A9D08E" align="center">
								<xsl:value-of select="sum(//testsuite/@tests) - sum(//testsuite/@failures)"/>
							</td>
							<td bgcolor="#FF3B3B" align="center">
								<xsl:value-of select="sum(//testsuite/@failures)"/>
							</td>
						</tr>
					</tbody>
				</table>
				<br/>
				<br/>
				<br/>
				<table border="1" width="90%" align="center" cellpadding="0" cellspacing="0">
					<tbody>
						<tr bgcolor="#DCDCDC">
							<th width="2%">#</th>
							<th width="15%">Description</th>
							<th width="18%">Testcase</th>
							<th width="5%">Duration</th>
							<th width="5%">Result</th>
							<th width="30%">Error Message</th>
							<th width="10%">Screenshot</th>
						</tr>
						<xsl:for-each select="//testcase">
							<tr>
								<td align="center">
									<xsl:value-of select="position()"/>
								</td>
								<td>
									<xsl:apply-templates select="./@classname"/>
								</td>
								<td>
									<xsl:apply-templates select="./@name"/>
								</td>
								<td>
									<xsl:value-of select="format-number(./@time,'0.0')"/> s
									
								</td>
								<xsl:choose>
									<xsl:when test="failure">
										<td bgcolor="#FF3B3B" align="center">Fail</td>
										<td>
											<xsl:apply-templates select="./failure/@message"/>
											<br/>
						
													<span class="show"  tabindex="0"><u>See more...</u></span>
													<span class="hide" tabindex="0"><u>Hide</u></span>
													<br/>
													<span class="error">
.    													<xsl:apply-templates select="./failure"/>
													</span>
										</td>
										<td>
											<a>
												<xsl:variable name="screenshotName" select="./@name"/>
												<xsl:attribute name="href">TestResults/<xsl:value-of select="fn:replace($screenshotName,' ','_')"/>.png</xsl:attribute>
												<xsl:apply-templates select="./@name"/>.png</a>
										</td>
									</xsl:when>
									<xsl:otherwise>
										<td bgcolor="#A9D08E" align="center">Pass</td>
										<td/>
										<td/>
									</xsl:otherwise>
								</xsl:choose>
							</tr>
						</xsl:for-each>
					</tbody>
				</table>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>
