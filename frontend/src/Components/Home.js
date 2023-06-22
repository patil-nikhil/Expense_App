

const Home = () => {

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text text-uppercase badge bg-warning text-wrap fs-4" >OVERVIEW</h2>
                    <blockquote> One of the benefits of using an expense tracking system is that it's much faster to track expenses when out on the road, and this can be done immediately and quickly. With a mobile expense app, employees spend a lot less time tracking their expenses
                    </blockquote>
                    <h2>Reasons to Keep Track of Expenditures</h2>
                    <blockquote>
                        <h3>1. It Helps You Stick to Your Budget</h3>
                        After you set up a budget, which is a monthly plan for spending that takes into account your income and expenses, tracking expenses daily is essential to keeping you on that budget.1
                        Consumer.gov. "Making a Budget."

                        If you don't track your money, you won't know when to stop spending in a given category (food or clothing, for example).
                    </blockquote><br />
                    <blockquote>
                        <h3>2. Tracking Your Expenses Can Reveal Spending Issues</h3>
                        Another reason you must identify your expenditures throughout the month is to become more aware of your spending habits. If you don’t know where your money is going, you won’t be able to recognize negative spending behaviors that you can easily change to make your money work for you.
                    </blockquote>
                </div>

                <div className="col-md-6 gap-5 d-flex align-items-center">
                    <img src="https://i.pinimg.com/originals/4f/c9/98/4fc998276ad1c29e69ef83d88243f5c6.png" width="500px" height="400px" alt="Expense" />
                </div>
            </div>
        </div>
    )
}

export default Home