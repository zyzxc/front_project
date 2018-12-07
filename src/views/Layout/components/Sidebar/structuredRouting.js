export const StructuredRoutes = routes => {
    let arr = [];
    if (!routes) return;
    routes.forEach(item => {
        if (!item.hidden && item.children) {
            if (item.children.length > 0) {
                arr.push(makeLevel1(item))
            }
        }
    });
    return arr;
};

const makeLevel1 = obj => {
    return {
        name: obj.name,
        path: obj.path,
        meta: {
            icon: obj.meta.icon,
            title: obj.meta.title
        },
        children: makeLevel2(obj.children)
    }
};

const makeLevel2 = obj => {
    let arr = [];
    obj.forEach(item => {
        if (!item.hidden) {
            if (!item.meta.parentName) {
                arr.push({
                    name: item.name,
                    path: item.path,
                    title: item.meta.title
                })
            }
        }
    });

    if (hasThird(obj)) {
        makeDummy(obj).forEach(thirds => {
            arr.push(thirds)
        })
    }
    return arr
};

const hasThird = obj => {
    let res = false;
    for (let item in obj) {
        if (obj[item].meta.parentName) {
            res = true;
            break
        }
    }
    return res
};

const makeDummy = obj => {
    let tmp = [], arr = [];

    obj.forEach(item => {
        if (item.meta.parentName) {
            tmp.push(item)
        }
    });
    let hasChild = checkHasThird(tmp);

    if (hasChild.length > 0) {
        hasChild.forEach(eachArr => {
            let tmc = [];

            eachArr.forEach(item => {
                tmc.push({
                    name: item.name,
                    path: item.path,
                    title: item.meta.title
                })
            });

            arr.push({
                title: eachArr[0]['meta']['parentTitle'],
                name: eachArr[0]['meta']['parentName'],
                children: tmc
            })
        })
    }
    return arr;
};


const checkHasThird = (arr) => {
    let _arr = [], _t = [], _temp;
    arr = arr.sort(function (a, b) {
        let s = a['meta']['parentName'],
            t = b['meta']['parentName'];
        return s < t ? -1 : 1;
    });
    if (arr.length) {
        _temp = arr[0][name]
    }

    for (let i in arr) {
        if (arr[i]['meta']['parentName'] === _temp) {
            _t.push(arr[i]);
        } else {
            _temp = arr[i]['meta']['parentName'];
            _arr.push(_t);
            _t = [arr[i]];
        }
    }
    _arr.push(_t);
    _arr.forEach((item, index) => {
        if (item.length <= 0) {
            _arr.splice(index, 1)
        }
    });
    return _arr
};
