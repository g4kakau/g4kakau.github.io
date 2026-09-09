# 把作者接回 kakau.tw 上那一個 canonical Person entity。
#
# 為什麼需要這個 plugin：`_data/authors.yml` 加上 `_config.yml` 的 posts default 已經讓
# jekyll-seo-tag 產生正確的 author（型別 Person、姓名、連到 kakau.tw/about），但 seo-tag 的
# JSONLDDrop 只輸出 @type / name / url 三個欄位，沒有辦法帶 `@id`。少了 @id，crawler 只能靠
# 姓名和 URL 猜這位作者和 kakau.tw 上的創辦人是不是同一個人。
#
# 所以這裡不另外產生一份 BlogPosting——疊第二份同型別 schema 只會讓兩個 entity 互相競爭——
# 而是就地把 @id 補進 seo-tag 已經輸出的 author 物件。值同樣來自 `_data/authors.yml`，
# 沒有第二份作者資料。
module KakauAuthorIdentity
  JSON_LD = %r{(<script type="application/ld\+json">)(.*?)(</script>)}m.freeze

  # seo-tag 只認得這幾個 key，其餘欄位（english_name、id）是給這裡用的。
  def self.identity_for(site, name)
    author = site.data.dig("authors", name)
    return nil unless author.is_a?(Hash) && author["id"] && author["name"]

    { "@id" => author["id"], "alternateName" => author["english_name"] }.compact
  end

  def self.rewrite(html, identity)
    html.gsub(JSON_LD) do
      opening, body, closing = Regexp.last_match(1), Regexp.last_match(2), Regexp.last_match(3)
      schema = begin
        JSON.parse(body)
      rescue JSON::ParserError
        nil
      end
      next "#{opening}#{body}#{closing}" unless schema.is_a?(Hash) && schema["author"].is_a?(Hash)

      # @id 排在最前面，讀起來就是「這個 author 是誰」而不是「這個 author 叫什麼」。
      schema["author"] = identity.merge(schema["author"])
      "#{opening}#{JSON.generate(schema)}#{closing}"
    end
  end
end

Jekyll::Hooks.register :documents, :post_render do |doc|
  identity = KakauAuthorIdentity.identity_for(doc.site, doc.data["author"])
  next unless identity

  doc.output = KakauAuthorIdentity.rewrite(doc.output, identity)
end
