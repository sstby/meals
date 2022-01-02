const sampleRecipes = {
    recipe1: {
        name: 'Чечевичный суп',
        image: '/images/soup.jpg',
        desc: 'Вкусный суп.',
        portions: 8,
        consist: {
            calories: 189,
            proteins: 11,
            fats: 3,
            carbons: 27
        },
        ingridients: {
            ing1: {
                name: 'Красная чечевица',
                count: '300 г',
            },
            ing2: {
                name: 'Картошка',
                count: '200 г',
            },
            ing3: {
                name: 'Лук',
                count: '1 головка',
            },
            ing4: {
                name: 'Морковь',
                count: '1 штука',
            },  
        }
    },

    recipe2: {
        name: 'Протеиновые панкейки',
        image: '/images/pancakes.jpg',
        desc: 'Красивые панкейки с большим содержанием белка',
        portions: 2,
        consist: {
            calories: 136,
            proteins: 21.92,
            fats: 3.63,
            carbons: 9.64
        },
        ingridients: {
            ing1: {
                name: 'Овсяная мука',
                count: '20 г',
            },
            ing2: {
                name: 'Протеиновый порошок',
                count: '1 скуп',
            },
            ing3: {
                name: 'Яйцо куриное',
                count: '1 шт',
            },
            ing4: {
                name: 'Молоко',
                count: '50 мл',
            },
            
        }
    },
}

export default sampleRecipes