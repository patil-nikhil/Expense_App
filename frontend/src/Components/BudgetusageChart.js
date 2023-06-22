import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"


Chart.register(
  Tooltip, Title, ArcElement, Legend
)

const BudgetusageChart = (props) => {

  const { totalBudgetUsed, unUsedBudget } = props

  const data = {
    labels: [
      "Budget Used",
      'Remaining Purse',
    ],
    datasets: [{
      label: 'Budget Usage',
      data: [totalBudgetUsed, unUsedBudget],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div className="">
      <h1 className="text text-uppercase badge bg-primary text-wrap fs-6">Budget Usage</h1>
      <Pie data={data} />
    </div>

  )
}

export default BudgetusageChart