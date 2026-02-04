
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, DeletedTransaction, DEFAULT_CATEGORIES, CategoriesState } from './types';
import { calculateTotals, getAvailableMonths } from './utils/helpers';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import MonthlySummaryView from './components/MonthlySummaryView';
import TrashView from './components/TrashView';
import ComparisonChart from './components/ComparisonChart';
import CategoryManager from './components/CategoryManager';
import Auth from './components/Auth';
import { LayoutDashboard, LogOut, Settings, AlertTriangle, User } from 'lucide-react';

type Tab = 'dashboard' | 'monthly' | 'trash' | 'settings';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return sessionStorage.getItem('finanzapro_current_user');
  });

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deletedTransactions, setDeletedTransactions] = useState<DeletedTransaction[]>([]);
  const [categories, setCategories] = useState<CategoriesState>(DEFAULT_CATEGORIES);
  const [selectedMonth, setSelectedMonth] = useState('all');

  const txKey = currentUser ? `finanzapro_transactions_${currentUser}` : '';
  const delKey = currentUser ? `finanzapro_deleted_${currentUser}` : '';
  const catKey = currentUser ? `finanzapro_categories_${currentUser}` : '';

  useEffect(() => {
    if (currentUser) {
      const savedTx = localStorage.getItem(txKey);
      const savedDel = localStorage.getItem(delKey);
      const savedCat = localStorage.getItem(catKey);

      setTransactions(savedTx ? JSON.parse(savedTx) : []);
      setDeletedTransactions(savedDel ? JSON.parse(savedDel) : []);
      setCategories(savedCat ? JSON.parse(savedCat) : DEFAULT_CATEGORIES);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(txKey, JSON.stringify(transactions));
  }, [transactions, currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(delKey, JSON.stringify(deletedTransactions));
  }, [deletedTransactions, currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(catKey, JSON.stringify(categories));
  }, [categories, currentUser]);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletionReason, setDeletionReason] = useState('');

  const handleLogin = (username: string) => {
    sessionStorage.setItem('finanzapro_current_user', username);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('finanzapro_current_user');
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleImportData = (data: any) => {
    if (data.transactions) setTransactions(data.transactions);
    if (data.deletedTransactions) setDeletedTransactions(data.deletedTransactions);
    if (data.categories) setCategories(data.categories);
  };

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const confirmDelete = () => {
    if (!deletingId || !deletionReason.trim()) return;
    const txToDelete = transactions.find(t => t.id === deletingId);
    if (txToDelete) {
      const deletedTx: DeletedTransaction = {
        ...txToDelete,
        deletedAt: new Date().toISOString(),
        deletionReason: deletionReason,
      };
      setDeletedTransactions(prev => [deletedTx, ...prev]);
      setTransactions(prev => prev.filter(t => t.id !== deletingId));
    }
    setDeletingId(null);
    setDeletionReason('');
  };

  const restoreTransaction = (id: string) => {
    const txToRestore = deletedTransactions.find(t => t.id === id);
    if (txToRestore) {
      const { deletedAt, deletionReason, ...originalTx } = txToRestore;
      setTransactions(prev => [originalTx as Transaction, ...prev]);
      setDeletedTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const availableMonths = useMemo(() => getAvailableMonths(transactions), [transactions]);
  const filteredTransactions = useMemo(() => {
    if (selectedMonth === 'all') return transactions;
    return transactions.filter(t => {
      const d = new Date(t.date);
      const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      return m === selectedMonth;
    });
  }, [transactions, selectedMonth]);

  const { income, expense } = useMemo(() => calculateTotals(filteredTransactions), [filteredTransactions]);

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-12">
      {deletingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-xl font-bold">Eliminar Movimiento</h3>
            </div>
            <p className="text-slate-600 mb-6 text-sm">Indica el motivo para guardarlo en la papelera.</p>
            <textarea
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm mb-6 min-h-[100px]"
              placeholder="Ej: Error al ingresar monto..."
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={() => setDeletingId(null)} className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100">Cancelar</button>
              <button disabled={!deletionReason.trim()} onClick={confirmDelete} className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-white bg-rose-600 disabled:opacity-50">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-slate-100 mb-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">FinanzaPro</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>Panel</button>
            <button onClick={() => setActiveTab('monthly')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>Historial</button>
            <button onClick={() => setActiveTab('trash')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'trash' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}>Papelera</button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'settings' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500'}`}>Configuración</button>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
               <User size={14} className="text-slate-400" />
               <span className="text-xs font-bold text-slate-600">@{currentUser}</span>
             </div>
             <button onClick={handleLogout} className="text-slate-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50" title="Cerrar Sesión">
               <LogOut size={20} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && (
          <>
            <SummaryCards income={income} expense={expense} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-8">
                <TransactionForm onAdd={addTransaction} categories={categories} />
                <Charts transactions={filteredTransactions} />
              </div>
              <div className="lg:col-span-8">
                <ComparisonChart income={income} expense={expense} />
                <TransactionList transactions={filteredTransactions} onDelete={(id) => setDeletingId(id)} selectedMonth={selectedMonth} availableMonths={availableMonths} onMonthChange={setSelectedMonth} />
              </div>
            </div>
          </>
        )}
        {activeTab === 'monthly' && <MonthlySummaryView transactions={transactions} />}
        {activeTab === 'trash' && <TrashView deletedTransactions={deletedTransactions} onRestore={restoreTransaction} />}
        {activeTab === 'settings' && (
          <CategoryManager 
            categories={categories} 
            setCategories={setCategories} 
            transactions={transactions}
            deletedTransactions={deletedTransactions}
            onImportData={handleImportData}
          />
        )}
      </main>
    </div>
  );
};

export default App;
