# LDColorful - linux.do 论坛帖子等级颜色标记脚本

这是一个 [Tampermonkey](https://www.tampermonkey.net/) / [Greasemonkey](https://www.greasespot.net/) 用户脚本，旨在通过颜色区分 [linux.do](https://linux.do/) 论坛帖子的等级，并允许用户自定义颜色。

## 功能

*   **自动着色**: 根据帖子分类标签中的等级信息 (`Lv1`, `Lv2`, `Lv3`)，自动为帖子标题设置不同的颜色。
    *   **Lv3**: 亮橙色 (`#FF8C00`)
    *   **Lv2**: 浅天蓝 (`#87CEFA`)
    *   **Lv1**: 默认颜色 (`inherit`)
    *   **其他 (Lv0)**: 默认颜色 (`inherit`)
*   **颜色自定义**: 通过 Tampermonkey 扩展菜单，可以为每个等级 (Lv3, Lv2, Lv1, 其他Lv0) 设置你喜欢的颜色。支持颜色名称 (如 `red`)、十六进制代码 (如 `#FF0000`) 或 `inherit` (恢复默认样式)。
*   **动态加载支持**: 脚本能够检测并处理论坛动态加载的帖子列表（当你向下滚动或切换页面时），确保新加载的帖子也能正确着色。

## 安装

1.  **安装用户脚本管理器**: 你需要在浏览器中安装一个用户脚本管理器扩展。推荐使用 [Tampermonkey](https://www.tampermonkey.net/) (适用于 Chrome, Firefox, Edge, Safari, Opera 等)。
2.  **安装脚本**:
    *   点击 [此链接](https://github.com/1e0n/LinuxDoColorful/raw/main/LDColorful.user.js) (你需要先将项目上传到 GitHub 并替换此链接) 或直接将 `LDColorful.user.js` 文件拖到浏览器中。
    *   或者，打开 Tampermonkey 仪表盘，选择 “实用工具” -> “从文件导入” 并选择 `LDColorful.user.js` 文件。
    *   或者，在 Tampermonkey 仪表盘创建一个新脚本，然后将 `LDColorful.user.js` 的全部内容复制粘贴进去。
3.  Tampermonkey 会提示你安装脚本，点击“安装”即可。

## 使用方法

1.  安装脚本后，访问 [linux.do](https://linux.do/) 的任何帖子列表页面。
2.  脚本会自动运行，并根据帖子的等级为标题着色。
3.  要自定义颜色，请点击浏览器工具栏上的 Tampermonkey 图标，找到 "LDColorful" 脚本，然后选择以下任一菜单项：
    *   `设置 Lv3 颜色`
    *   `设置 Lv2 颜色`
    *   `设置 Lv1 颜色`
    *   `设置 其他 (Lv0) 颜色`
4.  在弹出的对话框中输入你想要的颜色（例如 `pink`, `#00FF00`, `inherit`），然后按确定。输入 `inherit` 或留空将恢复为论坛默认样式（对于 Lv3 和 Lv2，则是恢复脚本内定义的默认颜色）。
5.  脚本会提示颜色设置成功，并建议刷新页面以查看完整效果。

## 贡献

欢迎提出问题、建议或贡献代码。

## License

[MIT](./LICENSE) (如果需要，请添加一个 LICENSE 文件)
