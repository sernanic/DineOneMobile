import { useState, useEffect } from 'react';
import axios from 'axios';

const useMenuData = (section) => {
    const [menuState, setMenuState] = useState({
        sectionItems: [],
        allSubSections: [],
        filteredItems: [],
        subSections: [],
        selectedSubsection: null,
        hasLoaded: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4000/api/10/categories/6JDE8MZSA6FJ1');
                const { categories } = response.data;
                
                const transformedSubSections = categories.map(category => ({
                    id: category.categoryId,
                    name: category.name,
                    section: section
                }));
                
                const allSubSectionsWithAll = [
                    { id: 0, name: 'All', section: 'All' },
                    ...transformedSubSections
                ];
                
                const transformedItems = categories.flatMap(category => 
                    category.items.map(item => ({
                        itemId: item.itemId,
                        name: item.name,
                        price: item.price,
                        images: item.images,
                        subsectionId: category.categoryId,
                        description: item.description
                    }))
                );

                setMenuState({
                    sectionItems: transformedItems,
                    allSubSections: allSubSectionsWithAll,
                    filteredItems: transformedItems,
                    subSections: allSubSectionsWithAll,
                    selectedSubsection: allSubSectionsWithAll[0],
                    hasLoaded: true
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [section]);

    return menuState;
};

export default useMenuData; 