import { ref } from 'vue'

export default function useCalculatePriceForBusinessCategories(companyOrZivnostModel: any){
    
    let finalPriceForBusinessCategori = ref(0)

    function calculatePriceForBusinessOfcategories(companyOrZivnostModel: any){
        
        console.log(companyOrZivnostModel)

        let priceForOneBusinessCategory = 0;
        if(companyOrZivnostModel){
            companyOrZivnostModel.forEach((element: any) => {
                priceForOneBusinessCategory = priceForOneBusinessCategory + element.price
                console.log(element.price)
            });
        }
        finalPriceForBusinessCategori.value = priceForOneBusinessCategory
        console.log("Price for BusinessCategories: " + finalPriceForBusinessCategori.value)
    }

    return {
        calculatePriceForBusinessOfcategories,
        finalPriceForBusinessCategori
    }
}