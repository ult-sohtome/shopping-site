# 開発環境構築手順

## 事前に必要なもの(Windows環境を想定)

- Node.js v22.15.0 or higher

## 開発環境構築手順

1. リポジトリをクローンする

2. パッケージをインストールする

    ```shell
    npm install
    cd server
    npm install
    ```

3. `.env`ファイルを作成する
    - `.env.example`ファイルを参考に、プロジェクト直下に`.env`ファイルを作成する
    - 翻訳スタブを使うか否か`true`または`false`を記述する
    - 商品スタブを使うか否かの初期値として`true`または`false`を記述する

4. 翻訳用サーバーの`.env`ファイルを`/server`に作成する
   - `.env.example`ファイルを参考に、`/server`配下に`.env`ファイルを作成する
   - PROXYを使用する場合：アドレスを記入し`USE_PROXY`を`true`にする
   - PROXYを使用しない場合：`USE_PROXY`を`false`にする

5. 翻訳用サーバーを起動する

    ```shell
    cd server
    node server.js
    ```

6. ローカルサーバーを起動する

    ```shell
    npm run dev
    ```