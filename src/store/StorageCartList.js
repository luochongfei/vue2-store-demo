class StorageCartList {
    static get() {
        let data = null;

        try {
            data = JSON.parse(window.localStorage.getItem('cartList'));
        } catch (error) {
            // nothing
        }

        return data;
    }

    static set(data) {
        window.localStorage.setItem('cartList', JSON.stringify(data));
    }
}

export default StorageCartList;
