import React, { useState } from 'react';

const ProfitCalculator = () => {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Flour', quantity: 2, unit: 'kg', cost: 3.50 },
    { id: 2, name: 'Tomato Sauce', quantity: 1, unit: 'kg', cost: 2.80 },
    { id: 3, name: 'Mozzarella Cheese', quantity: 1.5, unit: 'kg', cost: 12.00 }
  ]);

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      sellingPrice: 12.99,
      ingredientCost: 4.20,
      laborCost: 2.50,
      overheadCost: 1.80,
      popularity: 85
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      sellingPrice: 14.99,
      ingredientCost: 5.10,
      laborCost: 2.50,
      overheadCost: 1.80,
      popularity: 78
    }
  ]);

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    cost: ''
  });

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity && newIngredient.cost) {
      setIngredients(prev => [...prev, {
        ...newIngredient,
        id: Date.now(),
        quantity: parseFloat(newIngredient.quantity),
        cost: parseFloat(newIngredient.cost)
      }]);
      setNewIngredient({ name: '', quantity: '', unit: 'kg', cost: '' });
    }
  };

  const calculateTotalIngredientCost = () => {
    return ingredients.reduce((total, ing) => total + ing.cost, 0);
  };

  const calculateProfitMargin = (recipe) => {
    const totalCost = recipe.ingredientCost + recipe.laborCost + recipe.overheadCost;
    const profit = recipe.sellingPrice - totalCost;
    const margin = (profit / recipe.sellingPrice) * 100;
    return { profit, margin };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Recipe Costing & Profit Calculator</h2>
        <p className="text-gray-600">Calculate costs and profit margins for your recipes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingredients Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredient Costs</h3>
          
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Ingredient name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e.target.value }))}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <select
                value={newIngredient.unit}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, unit: e.target.value }))}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                step="0.01"
                placeholder="Quantity"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, quantity: e.target.value }))}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Cost ($)"
                value={newIngredient.cost}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, cost: e.target.value }))}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={addIngredient}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
            >
              Add Ingredient
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {ingredients.map(ingredient => (
              <div key={ingredient.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                <div>
                  <div className="font-medium text-gray-900">{ingredient.name}</div>
                  <div className="text-sm text-gray-600">{ingredient.quantity} {ingredient.unit}</div>
                </div>
                <div className="font-bold text-primary-600">${ingredient.cost}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded border">
            <div className="flex justify-between font-bold">
              <span>Total Ingredient Cost:</span>
              <span>${calculateTotalIngredientCost().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Recipe Profit Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipe Profit Analysis</h3>
          
          <div className="space-y-4">
            {recipes.map(recipe => {
              const { profit, margin } = calculateProfitMargin(recipe);
              const totalCost = recipe.ingredientCost + recipe.laborCost + recipe.overheadCost;
              
              return (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{recipe.name}</h4>
                      <p className="text-sm text-gray-600">Popularity: {recipe.popularity}%</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">${recipe.sellingPrice}</div>
                      <div className={`text-sm font-medium ${
                        margin > 60 ? 'text-green-600' : 
                        margin > 40 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {margin.toFixed(1)}% margin
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ingredient Cost:</span>
                      <span>${recipe.ingredientCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor Cost:</span>
                      <span>${recipe.laborCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overhead Cost:</span>
                      <span>${recipe.overheadCost}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 font-medium">
                      <span>Total Cost:</span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                      <span>Profit per item:</span>
                      <span className="text-green-600">${profit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Statistics */}
          <div className="mt-6 p-4 bg-gray-50 rounded border">
            <h4 className="font-semibold text-gray-900 mb-3">Profit Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Average Margin</div>
                <div className="font-bold text-green-600">
                  {(
                    recipes.reduce((total, recipe) => total + calculateProfitMargin(recipe).margin, 0) / recipes.length
                  ).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-gray-600">Most Profitable</div>
                <div className="font-bold text-gray-900">
                  {recipes.reduce((max, recipe) => 
                    calculateProfitMargin(recipe).margin > calculateProfitMargin(max).margin ? recipe : max
                  ).name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;