
import React, { useState, useRef } from 'react';
import { CategoriesState, Transaction, DeletedTransaction } from '../types';
import { Plus, Trash2, Tag, AlertCircle, Download, Upload, ShieldCheck } from 'lucide-react';

interface CategoryManagerProps {
  categories: CategoriesState;
  setCategories: React.Dispatch<React.SetStateAction<CategoriesState>>;
  transactions: Transaction[];
  deletedTransactions: DeletedTransaction[];
  onImportData: (data: any) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ 
  categories, 
  setCategories, 
  transactions, 
  deletedTransactions,
  onImportData 
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [activeType, setActiveType] = useState<'income' | 'expense'>('expense');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    if (categories[activeType].includes(trimmed)) {
      alert('Esta categoría ya existe');
      return;
    }
    setCategories(prev => ({
      ...prev,
      [activeType]: [...prev[activeType], trimmed]
    }));
    setNewCategory('');
  };

  const handleRemoveCategory = (cat: string) => {
    if (categories[activeType].length <= 1) {
      alert('Debes mantener al menos una categoría');
      return;
    }
    setCategories(prev => ({
      ...prev,
      [activeType]: prev[activeType].filter(c => c !== cat)
    }));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({
      version: "1.0",
      exportDate: new Date().toISOString(),
      transactions,
      deletedTransactions,
      categories
    }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `respaldo_finanzas_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (confirm('¿Estás seguro? Esto reemplazará todos tus datos actuales con los del archivo de respaldo.')) {
          onImportData(json);
          alert('Datos importados correctamente.');
        }
      } catch (err) {
        alert('Error al leer el archivo. Asegúrate de que sea un JSON válido de FinanzaPro.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Configuración</h2>
        <p className="text-slate-500">Gestiona tus etiquetas y la seguridad de tus datos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-fit">
          <div className="p-4 border-b border-slate-50 flex items-center gap-2">
            <Tag size={18} className="text-blue-500" />
            <h3 className="font-bold text-slate-800">Categorías Disponibles</h3>
          </div>
          <div className="flex bg-slate-50 border-b border-slate-100">
            <button
              onClick={() => setActiveType('expense')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                activeType === 'expense' ? 'text-rose-600 border-b-2 border-rose-600 bg-white' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Gastos
            </button>
            <button
              onClick={() => setActiveType('income')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                activeType === 'income' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Ingresos
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Nueva..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <button
                onClick={handleAddCategory}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {categories[activeType].map((cat) => (
                <div key={cat} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-lg group">
                  <span className="text-sm font-medium text-slate-700">{cat}</span>
                  <button
                    onClick={() => handleRemoveCategory(cat)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-fit">
          <div className="p-4 border-b border-slate-50 flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            <h3 className="font-bold text-slate-800">Respaldo y Seguridad</h3>
          </div>
          <div className="p-6 space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Tus datos se guardan solo en este navegador. Para no perder tu información si cambias de dispositivo o borras el historial, te recomendamos descargar un respaldo.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all border border-slate-200"
              >
                <Download size={18} />
                Exportar Datos
              </button>
              <button
                onClick={handleImportClick}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl transition-all border border-blue-100"
              >
                <Upload size={18} />
                Importar Datos
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".json"
              />
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
              <AlertCircle size={20} className="text-amber-500 shrink-0" />
              <div className="text-xs text-amber-800 space-y-1">
                <p className="font-bold">Privacidad Total</p>
                <p>FinanzaPro no envía tus datos a ningún servidor externo. Todo el procesamiento de exportación e importación ocurre localmente en tu equipo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
