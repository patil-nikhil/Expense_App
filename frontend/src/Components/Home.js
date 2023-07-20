const Home = () => {

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text text-uppercase badge bg-warning text-wrap fs-4" >OVERVIEW</h2>
                    <blockquote>
                        Personal finance management is an important part of people's lives. However, everyone does not have the knowledge or time to manage their finances in a proper manner. And, even if a person has time and knowledge, they do not bother with tracking their expenses as they find it tedious and time-consuming. Now, you don't have to worry about managing your expenses, as you can get access to an expense tracker that will help in the active management of your finances.
                    </blockquote>
                    <h2>Benefits of Using Daily Money Manager</h2>
                    <blockquote>
                        <h3>1. Prioritize Your Spending</h3>
                        Remember you are on a fixed income and have a limited amount of money to spend.
                        If you begin analyzing what you are spending your hard earned money on, you will be able to prioritize the spending.
                        This way, you will spend just on things you really need, like paying your EMIs, utility bills, rent and grocery shopping, rather than spending frivolously.
                    </blockquote><br />
                    <blockquote>
                        <h3>2. Become Aware of Poor Spending Habits</h3>
                        If you have a tendency to spend money on a whim, using an expense manager will help you identify those habits. When you see this spending in black and white, you will be able to take corrective measures. Primarily, you will think twice before spending on things you don’t really need.
                    </blockquote>
                    <blockquote>
                        <h3>3. Saving and Investment </h3>
                        When you track your expenses, you can save better and invest for your future. Spending aimlessly does not give you leeway to save and invest for your future.
                    </blockquote>
                </div>

                <div className="col-md-6 gap-5 d-flex align-items-center">
                    <img src="https://d31bgfoj87qaaj.cloudfront.net/blog/wp-content/uploads/2017/10/Blog-what-is-exp-manager.jpg" width="500px" height="400px" alt="Expense" />
                </div>
            </div>
        </div>
    )
}

export default Home