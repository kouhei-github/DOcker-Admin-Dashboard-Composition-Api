## Docker でVue3 Composition Apiの管理画面を爆速で構築する方法

---
Composition Api を使用して作られた管理画面(Admin Dashboard)が  
あまりにも少なかったので今回、**自作してみました**

## 実行方法
**起動方法**
```shell
# Dockerfileを編集した時
$ docker-compose up -d --build

# Ddocker-compose.ymlを変更した時
$ docker-compose up -d
```
***
**ストップ方法**
```shell
# コンテナの終了
$ docker-compose down
```

***
**スクレイピング完了後にすること**
```shell
# Imageの削除
$ docker image prune -a

# 起動中のcontainerの確認
$ docker container ls
# 削除
$ docker container prune

# 起動中のvolumeの確認
$ docker volume ls
# 削除
$ docker volume prune

# networkの削除
$ docker network prune

```

##上記のコードを一括実行
未使用なコンテナ, イメージ, ネットワークを一括削除
```shell
$ docker system prune

# volumeも破棄する場合はこちら
$ docker system prune --volumes
```

## 参考記事
[未使用のコンテナ、volumeなどを一括削除](https://qiita.com/reflet/items/5caa88abcf1e8964783a)

# Author

作成情報を列挙する

* 永松光平
* メディア運営室
* nagamatsu-k@dym.jp

# License
This is Confidential.
