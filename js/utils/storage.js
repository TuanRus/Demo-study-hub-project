// VI: Wrapper xử lý LocalStorage, tập trung logic lưu trữ (SRP) để tránh lặp code. 
// EN: LocalStorage wrapper, centralizing storage logic (SRP) to prevent code duplication.

export function getStorageData(key, defaultValue = []) {
    // VI: Sử dụng short-circuit evaluation để fallback về default data nếu chưa có cache. 
    // EN: Using short-circuit evaluation to fallback to default data if cache is miss.
    const dataJSON = localStorage.getItem(key);
    return dataJSON ? JSON.parse(dataJSON) : defaultValue;
}

export function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}