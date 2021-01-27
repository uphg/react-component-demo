if [ -z $1 ];then
parame="update"
else
parame=$1
fi

echo -e "\n== commit code =="
git add .
git commit -m "${parame}"
echo -e "== commit end ==\n"

echo "== push Github =="
git push github master:master
echo -e "== push Github end ==\n"

echo "== push Gitee =="
git push gitee master:master
echo -e "== push Gitee end ==\n"
