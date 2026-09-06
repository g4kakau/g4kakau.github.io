# Fix <title> for custom tabs that have no Chirpy locale entry.
#
# Chirpy generates <title> by looking up the page slug in _data/locales/zh-TW.yml
# under the `tabs:` key. Built-in tabs (about, archives, categories, tags) have
# entries; custom tabs (intro, academy, contact) do not, producing:
#   <title> | Site Title</title>
#
# This hook detects that pattern and substitutes page.title instead.

# _tabs/*.md files belong to the `tabs` collection → they are Jekyll::Documents,
# not Jekyll::Pages. Register on :documents so the hook actually fires.
Jekyll::Hooks.register :documents, :post_render do |doc|
  title = doc.data['title']
  next if title.nil? || title.strip.empty?
  next unless doc.output.is_a?(String)

  # Match: <title> | ...  (locale lookup returned empty string, leaving a
  # leading space before the pipe). Pages with a proper locale entry already
  # have non-empty content before the pipe, so the regex won't touch them.
  doc.output = doc.output.sub(/<title>(\s*)\|/, "<title>#{title} |")
end
