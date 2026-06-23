# Animal Atlas

Animal Atlas 是一个动物图鉴与社区互动系统，包含 Spring Boot 后端和 uni-app 前端。系统围绕动物资料管理、图鉴浏览、图片识别、收藏点赞、社区发帖和评论回复构建，适用于校园动物图鉴、自然观察记录、物种资料维护和科普内容展示等场景。

## 项目定位

项目采用前后端分离结构：

- `animal-atlas-serve` 提供动物资料、图片、用户、社区、评论、AI 识别等接口。
- `animal-atlas-ui` 提供移动端图鉴浏览、识别、发现社区和个人中心。
- `animal_atlas.sql` 提供数据库表结构和示例数据。

前端通过 HTTP 调用后端接口，图片资源由后端上传至对象存储后返回路径，移动端使用资源域名拼接展示。

## 技术栈

后端：

- Java 17
- Spring Boot 3.0.1
- Spring Web / Validation / Redis
- MyBatis / MyBatis Plus
- MySQL
- Druid 数据源
- JWT
- 七牛云 SDK
- 百度 EasyDL 接口
- OkHttp
- Hutool

前端：

- uni-app
- Vue 3 Composition API
- Pinia
- Vant Weapp
- z-paging
- jwt-decode
- 微信小程序定位插件

## 功能概览

### 动物图鉴

- 图鉴首页随机分页加载动物条目。
- 卡片展示动物头像、名称、昵称、性别、地点、生日、健康状态和简介。
- 支持进入动物详情页查看完整资料。
- 支持管理员或具备权限的用户新增动物资料。

### 动物详情

- 展示动物名称、主图、性别、点赞数、昵称、活动地点、生日、状态、品种和介绍。
- 状态异常时展示异常说明。
- 展示动物相册，支持图片预览。
- 支持收藏/点赞切换，点赞数即时反馈。
- 支持进入编辑页维护动物资料。
- 支持删除动物相册中的图片。

### 动物资料维护

- 新增动物条目。
- 编辑动物名称、性别、地点、昵称、生日、品种、状态、介绍和状态说明。
- 上传动物图片并绑定到动物 ID。
- 删除动物条目。
- 调用地图选点插件记录地点信息。

### AI 识别

- 用户选择本地图片后上传至 `/easydl/animal`。
- 后端调用百度 EasyDL 识别接口。
- 前端展示候选动物、匹配分数和关联图鉴条目。
- 支持从识别结果跳转到动物详情。
- 支持打开百科链接查看外部资料。

### 发现社区

- 发现页分页展示帖子列表。
- 登录用户可发布帖子。
- 帖子支持标题、正文和多图上传。
- 帖子详情展示作者、头像、发布时间、正文、图片和回复列表。
- 支持发表评论，并在当前页面追加展示。
- 支持按时间顺序切换回复展示模式。

### 用户中心

- 手机号验证码登录。
- JWT 保存和用户信息持久化。
- 个人中心展示头像、用户名和设置入口。
- 个人资料页支持修改用户名、头像上传和头像裁剪。
- 设置页支持退出登录。

## 后端接口概览

| 模块 | 方法 | 路径 | 说明 |
| --- | --- | --- | --- |
| user | GET | `/user/getCheckCode/{phone}` | 获取验证码 |
| user | POST | `/user/loginByCheckCode` | 验证码登录 |
| user | GET | `/user/getUserInfo` | 查询当前用户 |
| user | POST | `/user/updateUserInfo` | 更新个人资料 |
| user | POST | `/user/updateAvatar` | 上传头像 |
| animal | POST | `/animal/getAnimalRandom/{num}` | 随机分页获取动物列表 |
| animal | GET | `/animal/getAnimalInfo/{id}` | 获取动物详情 |
| animal | POST | `/animal/changeLike/{userId}/{animalId}` | 切换点赞状态 |
| animal | GET | `/animal/getLikeStatus/{userId}/{animalId}` | 查询点赞状态 |
| animal | PUT | `/animal/updateAnimal` | 更新动物资料 |
| animal | GET | `/animal/getAnimalPhoto/{id}` | 获取动物相册 |
| animal | POST | `/animal/uploadImg/{id}` | 上传动物图片 |
| animal | DELETE | `/animal/deleteAnimalImg/{id}` | 删除动物图片 |
| animal | POST | `/animal/addAnimal` | 新增动物 |
| animal | DELETE | `/animal/deleteAnimal/{id}` | 删除动物 |
| post | POST | `/post/addPost` | 发布帖子 |
| post | POST | `/post/uploadImg/{id}` | 上传帖子图片 |
| post | GET | `/post/getPostList/{pageNo}/{pageSize}` | 分页获取帖子 |
| post | GET | `/post/getPostInfo/{id}` | 获取帖子详情 |
| reply | GET | `/reply/getReplyList/post/{id}` | 获取帖子回复 |
| reply | POST | `/reply/addReply/post/{id}` | 新增回复 |
| easydl | POST | `/easydl/animal` | 图片识别 |
| common | POST | `/common/uploadImg/{folder}` | 通用图片上传 |

## 数据模型

数据库结构见 `animal_atlas.sql`，核心表包括：

- `animal`：动物主表，保存名称、性别、地点、头像、昵称、生日、品种、状态、介绍、异常说明、点赞数等。
- `animal_img`：动物相册图片。
- `like_record`：用户点赞记录。
- `user`：用户资料、头像、手机号、角色和状态。
- `invitation`：社区帖子。
- `invitation_img`：帖子图片。
- `reply`：帖子回复。
- `reply_img`：回复图片。

后端实体位于 `animal-atlas-serve/src/main/java/com/giftia/animalatlasserve/domain`，Mapper 位于 `mapper` 包和 `resources/mapper`。

## 前端页面

| 页面 | 路径 | 说明 |
| --- | --- | --- |
| 图鉴 | `pages/Atlas/Atlas` | 动物卡片流、分页加载、新增入口 |
| 动物详情 | `pages/AnimalDetail/AnimalDetail` | 资料详情、点赞、相册、编辑入口 |
| AI 识别 | `pages/AnimalIdentification/AnimalIdentification` | 图片上传识别、候选结果展示 |
| 发现 | `pages/ForumPage/ForumPage` | 社区帖子列表 |
| 发帖 | `pages/EditPost/EditPost` | 帖子编辑和图片上传 |
| 帖子详情 | `pages/PostPage/PostPage` | 帖子内容、图片、回复列表、评论输入 |
| 我的 | `pages/MyInfo/MyInfo` | 用户信息和功能入口 |
| 登录 | `pages/LoginPage/LoginPage` | 验证码登录 |
| 设置 | `pages/SettingPage/SettingPage` | 退出登录 |
| 个人资料 | `pages/PersonInfo/PersonInfo` | 用户名和头像维护 |
| 编辑动物 | `pages/UpdateAnimal/UpdateAnimal` | 动物资料新增、编辑、图片维护 |
| WebView | `pages/WebView/WebView` | 外部百科页面展示 |

## 目录结构

```text
animal-atlas-serve/
├── src/main/java/com/giftia/animalatlasserve
│   ├── config/        # MVC、Redis、拦截器等配置
│   ├── controller/    # HTTP 接口
│   ├── domain/        # 实体与 DTO
│   ├── mapper/        # MyBatis Mapper
│   ├── service/       # 业务服务
│   └── util/          # JWT、短信、七牛云、EasyDL 等工具
└── src/main/resources
    ├── application.yml
    └── mapper/

animal-atlas-ui/
├── pages/             # 移动端页面
├── components/        # 图鉴卡片、帖子、回复、加载、滑动组件
├── http/              # 请求封装与 API
├── store/             # Pinia 用户状态
├── common/            # 公共工具
├── static/            # 图标与静态资源
└── wxcomponents/vant/ # Vant Weapp 组件
```

## 本地运行

### 后端

准备 JDK 17、MySQL 和 Redis，导入 `animal_atlas.sql` 后修改 `animal-atlas-serve/src/main/resources/application.yml`：

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://<DB_HOST>:<DB_PORT>/<DB_NAME>?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8
    username: <DB_USERNAME>
    password: <DB_PASSWORD>
  data:
    redis:
      host: <REDIS_HOST>
      port: 6379
      password: <REDIS_PASSWORD>
```

启动服务：

```bash
cd animal-atlas-serve
./mvnw spring-boot:run
```

Windows：

```powershell
cd animal-atlas-serve
.\mvnw.cmd spring-boot:run
```

如需使用图片上传、验证码或 AI 识别，请补齐七牛云、短信服务、百度 EasyDL 和微信相关配置。

### 前端

```bash
cd animal-atlas-ui
npm install
```

修改 `animal-atlas-ui/http/index.js` 中的后端地址：

```js
export const baseURL = "http://localhost:8080"
```

使用 HBuilderX 打开 `animal-atlas-ui`，运行到浏览器、App 或微信小程序模拟器。运行小程序端时，请同步检查 `manifest.json`、`pages.json` 和定位插件配置。

## 典型使用流程

1. 用户进入图鉴页浏览动物列表。
2. 点击动物卡片进入详情，查看档案资料、相册和点赞状态。
3. 登录后可点赞、发帖、评论或维护个人资料。
4. 有权限的用户可新增或编辑动物资料，并上传动物图片。
5. 用户在识别页上传图片，系统返回候选动物并可跳转图鉴详情。
6. 用户在发现页浏览社区帖子，发布图文内容并参与评论。

## 应用场景

项目适用于校园动物图鉴、自然观察记录、科普内容管理、物种资料维护、动物社区互动和图片识别体验等场景。
