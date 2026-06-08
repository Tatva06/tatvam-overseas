// Smart Search with Autocomplete & Fuzzy Matching
function initSmartSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput || typeof products === 'undefined') return;
    
    // Create autocomplete container
    const autocomplete = document.createElement('div');
    autocomplete.id = 'autocomplete';
    autocomplete.className = 'absolute top-full left-0 right-0 bg-white border border-slate-300 rounded-b-lg shadow-xl z-50 max-h-96 overflow-y-auto hidden';
    searchInput.parentElement.appendChild(autocomplete);
    
    // Build search index
    const searchIndex = products.map(p => ({
        id: p.id,
        text: `${p.grade} ${p.description} ${p.category} ${p.department}`.toLowerCase(),
        grade: p.grade,
        category: p.category,
        image: typeof getProductImage === 'function' ? getProductImage(p) : p.image
    }));
    
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            autocomplete.classList.add('hidden');
            return;
        }
        
        debounceTimer = setTimeout(() => {
            // Fuzzy search
            const results = searchIndex
                .map(item => {
                    const score = fuzzyScore(query, item.text);
                    return { ...item, score };
                })
                .filter(item => item.score > 0.3)
                .sort((a, b) => b.score - a.score)
                .slice(0, 5);
            
            if (results.length === 0) {
                autocomplete.innerHTML = '<div class="p-4 text-slate-400 text-sm text-center">No matches found</div>';
                autocomplete.classList.remove('hidden');
                return;
            }
            
            autocomplete.innerHTML = results.map(r => `
                <div class="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b last:border-0" 
                     onclick="selectSearchResult('${r.id}')">
                    <img src="${r.image}" class="w-12 h-12 object-cover rounded" alt="${r.grade}">
                    <div class="flex-1">
                        <div class="font-bold text-sm text-slate-900">${r.grade}</div>
                        <div class="text-xs text-slate-500">${r.category}</div>
                    </div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-slate-400"></i>
                </div>
            `).join('');
            
            autocomplete.classList.remove('hidden');
            lucide.createIcons();
        }, 300);
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !autocomplete.contains(e.target)) {
            autocomplete.classList.add('hidden');
        }
    });
}

function fuzzyScore(query, text) {
    // Simple fuzzy matching algorithm
    let score = 0;
    let queryIndex = 0;
    
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
        if (text[i] === query[queryIndex]) {
            score += 1;
            queryIndex++;
        }
    }
    
    // Boost exact substring matches
    if (text.includes(query)) score += query.length;
    
    return score / Math.max(query.length, text.length);
}

function selectSearchResult(id) {
    document.getElementById('autocomplete')?.classList.add('hidden');
    openProductModal(id);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSmartSearch);