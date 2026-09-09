#!/usr/bin/env ruby
# frozen_string_literal: true

# 檢查簡轉繁留下的非台灣用詞。
#
# 為什麼不用 grep：有幾個詞會跨詞邊界誤判合法的繁體寫法（「函數組合」裡有「數組」、
# 「平方差」裡有「方差」），需要前後文守衛。用 grep -E 寫成 `數組([^合成]|$)` 這種形式，
# 在 GNU grep 與 BSD grep、以及不同 locale 下，`[^合成]` 可能被當成「位元組」而不是
# 「字元」的否定集合，行為不一致 —— 中文一個字是三個位元組，於是守衛會在某些平台上
# 悄悄失效，讓真正的違規漏掉。Ruby 的正則是 Unicode-aware，而且支援 lookaround，
# 在 macOS 與 CI 的 ubuntu 上結果相同。Jekyll 本來就要 Ruby，沒有新增依賴。

require "find"

# 每一條是 [正則, 說明]。有守衛的附上它排除掉的合法寫法，之後才知道為什麼要留著。
RULES = [
  [/經典力學/,      "古典力學"],
  [/坐標/,          "座標"],
  # 「算法」在台灣指 algorithm 時應為「演算法」；但「兩種算法」「附算法」是合法的
  # 「計算方法」用法，所以只在不是「演算法」、也不是量詞接續時才算違規。
  [/(?<![演種附])算法/, "演算法"],
  [/數組(?![合成])/, "陣列（排除：函數組合、偏導數組成）"],
  [/(?<![平立])方差/, "變異數（排除：平方差、立方差）"],
  [/方程組/,        "聯立方程式"],
  [/標量/,          "純量"],
  [/固體物理/,      "凝態物理"],
  [/形狀信息/,      "形狀資訊"],
  [/觀測數據/,      "觀測資料"],
  [/實驗數據/,      "實驗資料"],
  [/保存完整/,      "保持完整"],
  [/查找/,          "尋找／查詢"],
  [/高亮/,          "標示"],
  [/點擊/,          "點選"],
  [/端點配置/,      "端點設定"],
  [/最高效/,        "最有效率"],
  [/高效計算/,      "高效率計算"],
  [/解耦(?!合)/,    "解除耦合（排除：解耦合振子）"],
].freeze

ROOTS = %w[index.html _tabs _includes _posts _data paths docs].freeze

# 這個檔案就是在記錄用詞 bug 本身，必須引用被禁止的寫法，否則說不清楚改了什麼。
SKIP = %r{(\A|/)fact-audit\.md\z}

TEXT = /\.(md|markdown|html|yml|yaml)\z/

violations = []

ROOTS.each do |root|
  next unless File.exist?(root)

  Find.find(root) do |path|
    next unless File.file?(path)
    next unless path.match?(TEXT)
    next if path.match?(SKIP)

    File.foreach(path, encoding: "UTF-8").with_index(1) do |line, number|
      RULES.each do |pattern, suggestion|
        next unless line.match?(pattern)

        violations << [path, number, pattern.source, suggestion, line.strip]
      end
    end
  end
end

violations.each do |path, number, pattern, suggestion, line|
  warn "#{path}:#{number}: 命中 /#{pattern}/（建議：#{suggestion}）"
  warn "    #{line}"
end

if violations.empty?
  exit 0
else
  warn "ERROR: found forbidden non-Taiwan terminology (#{violations.length})"
  exit 1
end
