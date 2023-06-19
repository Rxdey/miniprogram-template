// 移除null和undefined
export const cleanObj = (obj) => {
    return Object.keys(obj).reduce((p, n) => {
        if (obj[n] || obj[n] === 0 || obj[n] === false) p[n] = obj[n];
        return p;
    }, {});
};
// 覆盖合并
export const mergeObjects = (obj1, obj2) => {
    const merged = { ...obj2 };
  
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (typeof obj1[key] === 'object' && !Array.isArray(obj1[key]) &&
            typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
          merged[key] = mergeObjects(obj1[key], obj2[key]);
        } else {
          merged[key] = obj1[key];
        }
      }
    }
  
    return merged;
};
  