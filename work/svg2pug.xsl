<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="text"/>

<xsl:template match="node()">
<xsl:for-each select="."><xsl:value-of select="substring('                               ', 0, 2 * count(ancestor::*))"/><xsl:value-of select="local-name()"/><xsl:if test="@*">(<xsl:for-each select="@*"><xsl:value-of select="concat(local-name(), '=', '&quot;', ., '&quot;')"/><xsl:if test="not(position()=last())"><xsl:text> </xsl:text></xsl:if></xsl:for-each>)</xsl:if><xsl:text>
 </xsl:text><xsl:apply-templates/></xsl:for-each>
</xsl:template>

</xsl:stylesheet>
