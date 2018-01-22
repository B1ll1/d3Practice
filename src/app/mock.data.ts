export const ROOT = {
    "name": "Top Level",
    "value": 10,
    "type": "black",
    "icon": "assets/images/hanger.png",
    "level": "red",
    "children": [
        { 
            "name": "Level 2: A",
            "value": 15,
            "type": "grey",
            "icon": "assets/images/car.png",
            "level": "red",            
            "children": [ 
                { 
                    "name": "Son of A",
                    "value": 5,
                    "type": "steelblue",
                    "icon": "assets/images/tv.png",
                    "level": "orange" 
                },
                { 
                    "name": "Daughter of A",
                    "value": 8,
                    "type": "steelblue",
                    "icon": "assets/images/box.png",
                    "level": "red"
                } 
            ] 
        },
        { 
            "name": "Level 2: B",
            "value": 10,
            "type": "grey",
            "icon": "assets/images/house.png",
            "level": "green"
        } 
    ]
}

export const flatROOT = [
    {
        "name": "Top Level",
        "parent": null,
        "value": 10,
        "type": "black",
        "icon": "assets/images/hanger.png",
        "level": "red",
    },
    {
        "name": "Level 2: A",
        "parent": "Top Level",
        "value": 15,
        "type": "grey",
        "icon": "assets/images/car.png",
        "level": "red",
    },
    {
        "name": "Level 2: B",
        "parent": "Top Level",
        "value": 10,
        "type": "grey",
        "icon": "assets/images/house.png",
        "level": "green"
    },
    {
        "name": "Son of A",
        "parent": "Level 2: A",
        "value": 5,
        "type": "steelblue",
        "icon": "assets/images/tv.png",
        "level": "orange" 
    },
    {
        "name": "Daughter of A",
        "parent": "Level 2: A",
        "value": 8,
        "type": "steelblue",
        "icon": "assets/images/box.png",
        "level": "red"
    }
]