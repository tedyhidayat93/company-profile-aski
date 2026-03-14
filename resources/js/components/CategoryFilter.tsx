import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface CategoryOption {
    label: string;
    value: string;
    subcategories?: CategoryOption[];
}

interface CategoryFilterProps {
    categories: CategoryOption[];
    selectedCategory?: string;
    onCategoryChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function CategoryFilter({
    categories,
    selectedCategory = '',
    onCategoryChange,
    placeholder = 'Pilih Kategori',
    className = ''
}: CategoryFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter categories based on search term
    const filterCategories = (categories: CategoryOption[], term: string): CategoryOption[] => {
        if (!term) return categories;
        
        const searchTerm = term.toLowerCase();
        return categories.filter(category => {
            const categoryMatches = category.label.toLowerCase().includes(searchTerm);
            const subcategoryMatches = category.subcategories?.some(sub => 
                sub.label.toLowerCase().includes(searchTerm)
            );
            return categoryMatches || subcategoryMatches;
        });
    };

    // Get display text for selected category
    const getSelectedDisplay = (categories: CategoryOption[], selected: string): string => {
        if (!selected) return placeholder;
        
        for (const category of categories) {
            if (category.value === selected) {
                return category.label;
            }
            const subcategory = category.subcategories?.find(sub => sub.value === selected);
            if (subcategory) {
                return `${category.label} - ${subcategory.label}`;
            }
        }
        return selected;
    };

    // Handle category selection
    const handleSelect = (value: string) => {
        onCategoryChange(value);
        setIsOpen(false);
        setSearchTerm('');
    };

    // Render category tree
    const renderCategory = (category: CategoryOption, level: number = 0) => {
        const paddingLeft = level * 24; // 24px per level
        
        return (
            <div key={category.value} className="border-b border-gray-100 last:border-b-0">
                <button
                    type="button"
                    onClick={() => handleSelect(category.value)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-amber-50 transition-colors ${
                        level === 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                    } ${selectedCategory === category.value ? 'bg-amber-50 border-l-2 border-amber-500' : ''}`}
                    style={{ paddingLeft: `${paddingLeft + 12}px` }}
                >
                    {category.label}
                </button>
                
                {category.subcategories?.map(subcategory => 
                    renderCategory(subcategory, level + 1)
                )}
            </div>
        );
    };

    const filteredCategories = filterCategories(categories, searchTerm);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full rounded-lg border border-gray-300 p-2 text-left bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 flex items-center justify-between"
                >
                    <span className="text-sm text-gray-700 truncate">
                        {getSelectedDisplay(categories, selectedCategory)}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari kategori..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
                                    autoFocus
                                />
                            </div>
                        </div>
                        
                        {/* Category Options */}
                        <div className="max-h-48 overflow-y-auto">
                            {/* All Categories Option */}
                            <button
                                type="button"
                                onClick={() => handleSelect('')}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-amber-50 border-b border-gray-100 transition-colors ${
                                    selectedCategory === '' ? 'bg-amber-50 border-l-2 border-amber-500' : ''
                                }`}
                            >
                                <span className="text-gray-700">Semua Kategori</span>
                            </button>
                            
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map(category => renderCategory(category))
                            ) : (
                                <div className="px-3 py-4 text-center text-sm text-gray-500">
                                    Tidak ada kategori ditemukan
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
