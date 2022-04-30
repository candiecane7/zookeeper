const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('filters by query', () => {
    const startingZookeepers = [
        {
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
        },
        {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
        }
    ]
    const updatedZookeepers = filterByQuery({ age: '31' }, startingZookeepers);

    expect(updatedZookeepers.length).toBe(1);
})

test('finds by id', () => {
    const startingZookeepers = [
        {
            "id": "2",
            "name": "Isabella",
            "age": 67,
            "favoriteAnimal": "bear"
        },
        {
            "id": "3",
            "name": "Linda",
            "age": 48,
            "favoriteAnimal": "otter"
        }
    ];
    const result = findById('3', startingZookeepers);

    expect(result.name).toBe('Linda');
})

test('creates new zookeeper', () => {
    const newZookeeper = createNewZookeeper({
        name: "jason",
        age: "55"
    }, zookeepers);

    expect(newZookeeper.name).toBe('jason');
    expect(newZookeeper.age).toBe('55');
});

test('validates zookeeper info', () => {
    const zookeeper = {
        "id": "0",
        "name": "Kim",
        "age": 28,
        "favoriteAnimal": "dolphin"
    }

    const invalidZookeeper = {
        "id": "1",
        "name": "Raksha",
        "age": 31
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect (result).toBe(true);
    expect(result2).toBe(false);
})

