# Append the two article-level components without modifying all post files.

Jekyll::Hooks.register :posts, :pre_render do |post, _payload|
  post.content = "#{post.content.rstrip}\n\n{% include contextual-cta.html %}\n\n{% include ecosystem-footer.html %}\n"
end
