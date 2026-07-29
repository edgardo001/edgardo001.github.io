<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="utf-8" indent="yes"/>
<xsl:template match="/">
<html lang="es"><head><meta charset="utf-8"/><title>Edgardo Vásquez — Blog</title><meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;margin:40px auto;padding:0 20px;color:#222;line-height:1.6}h1{font-size:1.8rem;display:flex;align-items:center;gap:12px}a{color:#00875a;text-decoration:none}a:hover{text-decoration:underline}ul{list-style:none;padding:0}li{margin-bottom:32px;display:flex;gap:16px;align-items:flex-start}time{font-size:0.85rem;color:#666;font-family:monospace;display:block}h2{margin:0 0 4px;font-size:1.2rem}p{margin:0;color:#555;font-size:0.95rem}.thumb{width:100px;height:70px;object-fit:cover;border-radius:4px;flex-shrink:0}.feed-logo{width:40px;height:40px;border-radius:8px}.item-body{flex:1}</style></head><body>
<h1><xsl:if test="rss/channel/image"><img class="feed-logo" src="{rss/channel/image/url}" alt=""/></xsl:if>Edgardo Vásquez — Blog</h1>
<p>Artículos sobre tecnología, liderazgo, arquitectura de software e IA.</p>
<ul><xsl:apply-templates select="rss/channel/item"/></ul></body></html>
</xsl:template>
<xsl:template match="item">
<li>
<xsl:if test="enclosure">
<img class="thumb" src="{enclosure/@url}" alt=""/>
</xsl:if>
<div class="item-body">
<time><xsl:value-of select="pubDate"/></time>
<h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
<p><xsl:value-of select="description"/></p>
</div>
</li>
</xsl:template>
</xsl:stylesheet>
