import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMenuData = (section) => {
    const [selectedSubsection, setSelectedSubsectionState] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    // Using React Query for data fetching and caching
    const { data: menuData, isLoading } = useQuery({
        queryKey: ['menuData', section],
        queryFn: async () => {
            const response = await axios.get('http://127.0.0.1:4000/api/10/categories/6JDE8MZSA6FJ1');
            const { categories } = response.data;
            const transformedSubSections = categories.map(category => ({
                id: category.categoryId,
                image: category.imageUrl,
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

            return {
                sectionItems: transformedItems,
                allSubSections: allSubSectionsWithAll,
                subSections: allSubSectionsWithAll,
            };
        },
        // Cache the data for 1 hour
        staleTime: 1000 * 60 * 60,
        // Keep the data in cache for 2 hours
        cacheTime: 1000 * 60 * 60 * 2,
    });

    const setSelectedSubsection = (subsection) => {
        setSelectedSubsectionState(subsection);
    };

    useEffect(() => {
        if (!menuData?.sectionItems) return;
        
        // Filter items based on both searchText and selectedSubsection
        const filtered = menuData.sectionItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesSubsection = !selectedSubsection || selectedSubsection.id === 0 || 
                                    item.subsectionId === selectedSubsection.id;
            return matchesSearch && matchesSubsection;
        });
        setFilteredItems(filtered);
    }, [searchText, selectedSubsection, menuData?.sectionItems]);

    return {
        sectionItems: menuData?.sectionItems ?? [],
        subSections: menuData?.subSections ?? [],
        allSubSections: menuData?.allSubSections ?? [],
        selectedSubsection: selectedSubsection || (menuData?.subSections[0] ?? null),
        setSelectedSubsection,
        filteredItems,
        setSearchText,
        isLoading
    };
};

export default useMenuData; 