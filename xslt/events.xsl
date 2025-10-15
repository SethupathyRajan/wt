<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<body>
<h2>events</h2>
<table border="1" cellpadding="5">
<tr>
 <th>Name</th>
 <th>Date</th>
 <th>Status</th>
</tr>
<xsl:for-each select="events/event">
<tr>
<td><xsl:value-of select="name"/></td>
<td><xsl:value-of select="date"/></td>
<td><xsl:value-of select="category"/></td>
</tr>
</xsl:for-each>
</table>
</body>
</html>

</xsl:template>
</xsl:stylesheet>