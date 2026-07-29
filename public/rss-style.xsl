<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="utf-8" indent="yes"/>
<xsl:template match="/">
<html lang="es"><head><meta charset="utf-8"/><title>Edgardo Vásquez — Blog</title><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;margin:40px auto;padding:0 20px;color:#222;line-height:1.6}h1{font-size:1.8rem}a{color:#00875a;text-decoration:none}a:hover{text-decoration:underline}ul{list-style:none;padding:0}li{margin-bottom:24px}time{font-size:0.85rem;color:#666;font-family:monospace}h2{margin:0 0 4px;font-size:1.2rem}p{margin:0;color:#555;font-size:0.95rem}</style></head><body>
<h1>Edgardo Vásquez — Blog</h1>
<p>Artículos sobre tecnología, liderazgo, arquitectura de software e IA.</p>
<ul><xsl:apply-templates select="rss/channel/item"/></ul></body></html>
</xsl:template>
<xsl:template match="item">
<li>
<time><xsl:value-of select="pubDate"/></time>
<h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
<p><xsl:value-of select="description"/></p>
</li>
</xsl:template>
</xsl:stylesheet>
