class VegetableStore {

    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }

    loadingVegetables(vegetables) {
        let added = [];
        for (const element of vegetables) {

            let [productName, productQuantity, productPrice] = element.split(' ');
            productPrice = Number(productPrice);
            productQuantity = Number(productQuantity);
            let product = { productName, productQuantity, productPrice };

            let isExist = this.availableProducts.findIndex(p => p.productName == productName);
            if (isExist == -1) {
                this.availableProducts.push(product);
                added.push(productName);
            } else {

                let updateProduct = this.availableProducts[isExist];
                updateProduct.productQuantity += productQuantity;

                if (updateProduct.productPrice < productPrice) {
                    updateProduct.productPrice = productPrice;
                }
            }
        }
        return `Successfully added ` + added.join(', ');
    }

    buyingVegetables(selectedProducts) {

        let totalPrice = 0.00;

        for (const element of selectedProducts) {

            let [selectedProductName, selectedProductQuantity] = element.split(' ');
            selectedProductQuantity = Number(selectedProductQuantity);
            let index = -1;
            let product = this.availableProducts.find(p => {
                index++;
                if (p.productName == selectedProductName) {
                    return p;
                }
                return undefined;
            });

            if (product == undefined) {
                throw new Error(`${selectedProductName} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            } else {
                if (product.productQuantity < selectedProductQuantity) {
                    throw new Error(`The quantity ${selectedProductQuantity} for the vegetable ${selectedProductName} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
                } else {
                    this.availableProducts[index].productQuantity -= selectedProductQuantity;
                    totalPrice += selectedProductQuantity * Number(product.productPrice);
                }
            }
        }
        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`
    }

    rottingVegetable (type, quantity){

        let findIndex = this.availableProducts.findIndex(p => p.productName == type);
        if(findIndex == -1){
            throw new Error (`${type} is not available in the store.`);
        }
        if(this.availableProducts[findIndex].productQuantity < quantity){
            this.availableProducts[findIndex].productQuantity = 0;
            return (`The entire quantity of the ${type} has been removed.`); 
        }
        this.availableProducts[findIndex].productQuantity -= quantity;
        return `Some quantity of the ${type} has been removed.`;
    }

    revision (){
        let result = `Available vegetables:\n`;
        this.availableProducts.sort((a, b) => a.productPrice - b.productPrice).forEach(p => {
            result += `${p.productName}-${p.productQuantity}-$${p.productPrice}\n`;
        });
        result += `The owner of the store is ${this.owner}, and the location is ${this.location}.`;
        return result;
    }
}


let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());



