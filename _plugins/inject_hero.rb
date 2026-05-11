# _plugins/inject_hero.rb
#
# Injects the rendered content of index.html (the hero/CTA block)
# before the #post-list div that Chirpy's home layout generates.
#
# This avoids overriding Chirpy's home.html layout entirely.

Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.url == '/'

  hero = page.content
  next if hero.nil? || hero.strip.empty?

  page.output = page.output.sub(
    '<div id="post-list"',
    "#{hero}\n<div id=\"post-list\""
  )
end
