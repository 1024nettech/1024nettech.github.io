import{set,get,del} from './idb-keyval-6.2.1-min.js'

// 检查 idb-keyval 是否加载成功
    if (typeof set === 'function' && typeof get === 'function' && typeof del === 'function') {
        console.log('idb-keyval 加载成功');
    } else {
        console.error('idb-keyval 加载失败');
    }

    // 存储数据
    set('user', { name: 'Alice', age: 25 }).then(() => {
        console.log('数据已存储');
    }).catch(error => {
        console.error('存储数据时出错:', error);
    });

    // 获取数据
    get('user').then(user => {
        console.log('获取的数据:', user);  // { name: 'Alice', age: 25 }
    }).catch(error => {
        console.error('获取数据时出错:', error);
    });

    // 删除数据
    del('user').then(() => {
        console.log('数据已删除');
    }).catch(error => {
        console.error('删除数据时出错:', error);
    });
