import os
import json
from datetime import datetime
from functools import cmp_to_key

jump_dir = [
    "menu.md",
    ".obsidian",
    "README.md",
    "2-本科.md",
    "build_menu.py",
    "skip_render_README.md",
    ".trash",
    ".git",
    "directory.json",
    "menu.md"
]

img_formats = [".png", ".jpg", ".jpeg", ".webp", ".drawio", ".svg"]

directory_path = "E:\\AmosTian.github.io\\source\\_posts"

init_tiltle_level = "#"

pre_content = """---
title: menu
top: 9999999999999999
mathjax: true
date: 2025年11月30日11:18:08
updated: {updated}
---

> 笔记目录

<!--more-->

"""

class Utils():
    @staticmethod
    def process_file(file_path):
        return "." + file_path.replace(directory_path, "").replace("\\", "/")

    @staticmethod
    def get_all_files_in_dir(directory):
        file_paths = []
        for filename in os.listdir(directory):
            file_paths.append(os.path.join(directory, filename))
        return file_paths
    
    @staticmethod
    def not_a_img_directory(path):
        if not os.path.isdir(path):
            return True
        files = Utils.get_all_files_in_dir(path)
        for file in files:
            if any(file.lower().endswith(ext) for ext in img_formats):
                return False
        return True
    
    """
    note：获取当前tree["content"]中，name对应的subtree
    tree: dict
    return: tree 字典
    """
    @staticmethod
    def get_tree_content_by_name(tree, name):
        for value in tree["content"]:
            if value["name"] == name:
                return value["content"]
            
    def cmp_title(md_path1, md_path2):
        try:
            title1 = int(md_path1.split("-")[0])
        except Exception as e:
            title1 = -1

        try:
            title2 = int(md_path2.split("-")[0])
        except Exception as e:
            title2 = -2

        if title1 > title2:
            return 1
        else:
            return -1

    """
    note：获取当前tree层级下，有序的title列表
    tree: tree["content"]
    return: tree["content"]中的有序names列表
    """
    @staticmethod
    def sort_current_level_titles(tree):
        titles = []
        for i in tree:
            titles.append(i["name"])
        titles.sort(key=cmp_to_key(Utils.cmp_title))
        return titles


    """
    note：对tree进行排序
    tree: tree["content"]{} 需要是一个字典
    return: 排序后的tree
    """
    @staticmethod
    def sort_tree(tree):
        sorted_tree_content = []
        sorted_titles = Utils.sort_current_level_titles(tree["content"])
        for title in sorted_titles:
            for item in tree["content"]:
                if item["name"] == title:
                    sorted_tree_content.append(item)
                    break
        
        tree["content"] = sorted_tree_content
        return tree


    """
    note：判断tree是否为图片目录
    tree: dict
    return: bool，若为图片目录，若目录中含图片，则返回False
    可能存在的问题，md与图片属于同一目录，所以图片必须放在md文件的同级子目录下
    """
    @staticmethod
    def tree_is_not_pic_dir(tree):
        if "file" == tree["type"]:
            return True
        for item in tree["content"]:
            if "pic_file" == item["type"]:
                return False
        return True

    '''
    note：将字符串转换为md中的列表项
    md_path: str，md文件路径
    f：menu.md文件句柄
    '''
    @staticmethod
    def write_list_item(md_path, f):
        name = md_path.split("/")[-1].replace(".md", "")
        try:
            # 处理序号为[n]-或[n].开头，且文件名中包含-及.的md文件
            if -1 != name.find("-") and \
                    -1 != name.find("."):
                    if name.find("-") < name.find("."):
                        num = name.split("-")[0]
                        if not num.isdigit():
                            raise Exception("num is not digit")
                        name = name.split("-")[1]
                    else:
                        num = name.split(".")[0]
                        if not num.isdigit():
                            raise Exception("num is not digit")
                        name = name.split(".")[1]
                # 处理序号为[n]-或[n].开头的md文件
            elif -1 != name.find("-"):
                num = name.split("-")[0]
                if not num.isdigit():
                    raise Exception("num is not digit")
                name = name.split("-")[1]
            elif -1 != name.find("."):
                num = name.split(".")[0]
                if not num.isdigit():
                    raise Exception("num is not digit")
                name = name.split(".")[1]
            link = num + ". [" + name + "](" + md_path + ")"
        except Exception as e:
            # 处理未标序号的md文件
            link = "[" + name + "](" + md_path + ")"

        f.write(link + "\n\n")

    @staticmethod
    def tree_is_not_in_md_lists(tree, md_lists):
        if "directory" == tree["type"]:
            return True
        if tree["content"] not in md_lists:
            return True

        return False


class MakeMenu():
    def __init__(self, directory_path):
        self.tgt_json_tree = self.get_directory_tree(directory_path)

    '''
    note：递归获取目录中的md文件目录树
    path: 文件或目录路径
    return: 目录树字典
    '''
    def get_directory_tree(self, path):
        tree = {"name": os.path.basename(path)}
        if os.path.isdir(path):
            tree["type"] = "directory"
            tree["content"] = []
            md_lists = []
            has_mds = False
            has_dirs = False

            for filename in os.listdir(path):
                child = os.path.join(path, filename)
                if os.path.isdir(child) and \
                    os.path.basename(filename) not in jump_dir and \
                        Utils.not_a_img_directory(child):
                    has_dirs = True
                if filename.endswith(".md") and \
                    os.path.basename(filename) not in jump_dir:
                    has_mds = True
                    md_lists.append(filename)
                if os.path.basename(filename) not in jump_dir and \
                    Utils.not_a_img_directory(child):
                    tree["content"].append(self.get_directory_tree(child))
            
            if has_mds and has_dirs:
                tree["md_lists"] = md_lists
        else:
            if path.endswith(".md"):
                tree["type"] = "file"
                tree["content"] = Utils.process_file(path)
            else:
                # 表示为图片文件
                tree["type"] = "pic_file"
                tree["content"] = None

        return tree
    
    """
    note：递归写入目录树
    tree: dict
    title_level: str，标题级别，以#表示
    f: menu.md文件句柄
    """
    def write_in(self, tree, title_level, f):
        if "directory" == tree["type"]:
            Utils.sort_tree(tree)
            if "_posts" != tree["name"]:
                f.write("\n" + title_level + " " + tree["name"] + "\n")

            #将md_lists中的md文件写入menu.md
            if "md_lists" in tree and \
                tree["md_lists"]:
                for md_path in tree["md_lists"]:
                    Utils.write_list_item(md_path, f)
            for subtree in tree["content"]:
                if "file" == subtree["type"] and \
                    "md_lists" in tree and \
                        Utils. tree_is_not_in_md_lists(subtree, tree["md_lists"]):
                    continue
                if Utils.tree_is_not_pic_dir(subtree):
                    self.write_in(subtree, title_level + "#", f)
        else:
            Utils.write_list_item(tree["content"], f)


if __name__ == "__main__":
    # 删除脚本同级目录下的 menu.md 与 directory_tree.json（若存在）
    script_dir = os.path.dirname(os.path.abspath(__file__))
    for fname in ["menu.md", "directory_tree.json"]:
        fpath = os.path.join(script_dir, fname)
        if os.path.exists(fpath):
            os.remove(fpath)

    mm = MakeMenu(directory_path)

    # 将tree按照title1进行排序
    Utils.sort_tree(mm.tgt_json_tree)

    # 将目录树转换为JSON，并记录到directory_tree.json
    json_data = json.dumps(mm.tgt_json_tree, ensure_ascii=False, indent=2)

    with open("directory_tree.json", "w") as f:
        f.write(json_data)

    with open("menu.md", "w", encoding="utf-8") as f:
        current_time = datetime.now().strftime("%Y年%m月%d日%H:%M:%S")
        f.write(pre_content.format(updated=current_time))

        """
        解决同级目录下，md的排序问题
        """
        mm.write_in(mm.tgt_json_tree, init_tiltle_level, f)