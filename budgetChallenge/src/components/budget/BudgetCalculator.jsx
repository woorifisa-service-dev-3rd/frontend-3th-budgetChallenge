import React, { useEffect, useState } from 'react'
import { budgetMessage } from './budgetMessage'
import { useChallenge } from '../../contexts/ChallengeContext'

const BudgetCalculator = ({ budgetAmount, formatCurrency }) => {

  const { history } = useChallenge();
  const [sum, setSum] = useState(budgetAmount || 0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const sumCalculateHandler = () => {
      let totalExpense = 0;
      history.map(item => {
        const itemCost = parseFloat(item.itemCost);
        if (!isNaN(itemCost)) {
          totalExpense += itemCost;
        }
      });

      setExpense(totalExpense);
      setSum((budgetAmount || 0) - totalExpense);
    };

    sumCalculateHandler();
  }, [budgetAmount, history]);

  // 소비 진행 비율 계산
  const progressPercentage = budgetAmount > 0 ? Math.min((expense / budgetAmount) * 100, 100) : 100;
  const message = budgetMessage(progressPercentage);

  return (
    <>
      <div className='space-x-20'>
        <span>지출</span>
        <span>{formatCurrency(expense)}원</span>
      </div>
      <div>
        <div className='mt-4'>
          <div className='w-11/12 bg-gray-300 rounded-md overflow-hidden my-5 ml-6'>
            <div
              className={`text-white text-center text-sm font-semibold h-6 flex items-center justify-center rounded-md ${sum < 0 ? 'bg-red-500' : 'bg-teal-400'}`}
              style={{ width: `${progressPercentage}%` }}
            >
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>
        <div className='space-x-16'>
          <span>남은 예산</span>
          <span>{formatCurrency(sum)}원</span>
        </div>
        <div>{message}</div>
      </div>
    </>
  )
};

export default BudgetCalculator