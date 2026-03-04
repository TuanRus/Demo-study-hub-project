// [EN] Generic LocalStorage wrappers to avoid code duplication
// [VN] Các hàm bọc LocalStorage chung để tránh lặp code

export function getStorageData(key, defaultValue = []) {
    const dataJSON = localStorage.getItem(key);
    return dataJSON ? JSON.parse(dataJSON) : defaultValue;
}

export function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}