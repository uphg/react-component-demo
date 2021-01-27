#!/usr/bin/env sh
set -e
rm -rf dist
yarn build
cd dist

echo -e "\n== commit build =="
git init
git add -A
git commit -m 'deploy'
echo -e "== commit end ==\n"

echo "== push Github =="
git push -f git@github.com:uphg/react-component-demo.git master:gh-pages
echo -e "== push Github end ==\n"

echo "== push Gitee =="
git push -f git@gitee.com:uphg/react-component-demo.git master:gh-pages
echo -e "== push Gitee end ==\n"

echo "== Exit the build folder =="
cd -
