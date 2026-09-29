# frozen_string_literal: true

# Translation relationships are content metadata, not an automatic translation system.
# A post participates only when it declares a shared `translation_id`; missing peers remain
# unavailable rather than being silently rendered in the wrong language.
SUPPORTED_LOCALES = %w[zh-TW en].freeze

Jekyll::Hooks.register :site, :post_read do |site|
  groups = site.posts.docs.select { |post| post.data["translation_id"] }.group_by do |post|
    post.data.fetch("translation_id")
  end

  groups.each do |translation_id, posts|
    localized = posts.select { |post| SUPPORTED_LOCALES.include?(post.data["lang"]) }
    duplicate_locales = localized.group_by { |post| post.data.fetch("lang") }.select { |_lang, peers| peers.length > 1 }
    unless duplicate_locales.empty?
      locales = duplicate_locales.keys.join(", ")
      raise Jekyll::Errors::FatalException, "translation_id #{translation_id.inspect} has duplicate locales: #{locales}"
    end

    localized.each do |post|
      post.data["translations"] = localized.map do |peer|
        { "lang" => peer.data.fetch("lang"), "url" => peer.url }
      end
    end
  end
end

Jekyll::Hooks.register :posts, :pre_render do |post, _payload|
  post.content = "{% include language-switcher.html %}\n\n#{post.content.rstrip}\n\n{% include contextual-cta.html %}\n\n{% include ecosystem-footer.html %}\n"
end
