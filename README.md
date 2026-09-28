# kakau-note

個人的物理與數學教育部落格，建立在 [**Chirpy**][chirpy] Jekyll 主題上。

## 網站內容

涵蓋：
- **高中物理**：力學、靜力學、電磁學基礎
- **大學數學**：微積分、線性代數、複變
- **應用物理**：天體力學、連續力學、現代物理

每篇文章都包含完整推導、圖示與習題式範例，適合自學與教學參考。

## 本地開發

快速開始：
```bash
rbenv install 3.3.6
cd ~/Projects/kakau-note   # repo 本地資料夾若還沒改名，改成你實際的路徑
bundle install
bundle exec jekyll serve
```

預設在 `http://localhost:4000`。

常見問題：

- **`ffi requires ruby >= 3.0` 或 `bundler: command not found: jekyll`**：正在用系統 Ruby（macOS 內建
  2.6），不是 rbenv 版本。確認 `which ruby` 指向 `~/.rbenv/shims/ruby`；若不是，執行
  `eval "$(rbenv init - zsh)"` 並重開 shell。repo 根目錄的 `.ruby-version`（`3.3.6`）會讓 rbenv
  自動切換版本，缺這個檔案是最常見原因。
- **改 `_config.yml` 沒生效**：這個檔案的變更不會 live reload，要重啟 `jekyll serve`。
- **數學式沒有渲染**：front matter 缺 `math: true`；完整規則見 [`docs/content/authoring.md`](docs/content/authoring.md)。

## 網站

https://notes.kakau.tw

（repo 為 `qavit/kakau-note`，2026-09-28 由 `g4kakau/g4kakau.github.io` 轉移並更名而來；網站網域未變。）

## 部署

推至 `theme` branch 會自動透過 GitHub Actions 部署。

## 文件

Repo 架構、發布規則、稽核紀錄與 migration 歷史見 [`docs/`](docs/README.md)；AI agent 操作規則見
[AGENTS.md](AGENTS.md)。

## License

[![GitHub license](https://img.shields.io/github/license/cotes2020/chirpy-starter.svg?color=blue)][mit]

[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/
[mit]: https://github.com/cotes2020/chirpy-starter/blob/master/LICENSE
