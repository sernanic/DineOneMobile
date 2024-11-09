import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMenuData = (section) => {
    const [selectedSubsection, setSelectedSubsectionState] = useState(null);

    // Using React Query for data fetching and caching
    const { data: menuData, isLoading } = useQuery({
        queryKey: ['menuData', section],
        queryFn: async () => {
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

    // Compute filtered items based on selected subsection
    const filteredItems = menuData && selectedSubsection
        ? selectedSubsection.id === 0 
            ? menuData.sectionItems 
            : menuData.sectionItems.filter(item => item.subsectionId === selectedSubsection.id)
        : [];

    return {
        sectionItems: menuData?.sectionItems ?? [],
        subSections: menuData?.subSections ?? [],
        allSubSections: menuData?.allSubSections ?? [],
        selectedSubsection: selectedSubsection || (menuData?.subSections[0] ?? null),
        setSelectedSubsection,
        filteredItems,
        isLoading
    };
};

export default useMenuData; 