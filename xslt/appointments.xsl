<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
    <head>
    <title>
Clinic Appointments
    </title>
    </head>

    <body>
    <h2>Clinic Appointments</h2>
    <table border="1" cellpadding="5">
    <tr>
        <th>Patients</th>
        <th>Doctor</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
    </tr>
    <xsl:for-each select="appointments/appointment">
    <xsl:sort select="doctor"/>
    <tr>
        <td><xsl:value-of select="patient"/></td>
        <td><xsl:value-of select="doctor"/></td>
        <td><xsl:value-of select="date"/></td>
        <td><xsl:value-of select="time"/></td>
        <td><xsl:value-of select="status"/></td>
    </tr>
    </xsl:for-each>
    </table>
    </body>

</html>

</xsl:template>
</xsl:stylesheet>