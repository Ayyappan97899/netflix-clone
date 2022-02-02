import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./WidgetLg.scss";

const WidgetLg = () => {
  const Button = ({ type }) => {
    return <button className={"widgetstBtn " + type}>{type}</button>;
  };

  return (
    <Card className="widgetlg">
      <CardContent>
        <h3 className="widgetlgTitle">Latest Transactions</h3>
        <table className="widgetTable">
          <thead>
            <tr className="widgetTr">
              <th className="widgetTh">Customer</th>
              <th className="widgetTh">Date</th>
              <th className="widgetTh">Amount</th>
              <th className="widgetTh">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="widgetTr">
              <td className="widgetUser">
                <img
                  src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt="profile"
                />
                <span className="name">Susan carol</span>
              </td>
              <td className="widgetDate">2 Jun 2021</td>
              <td className="widgetAmount">$200.00</td>
              <td className="widgetBtn">
                <Button type="Approved" />
              </td>
            </tr>
            <tr className="widgetTr">
              <td className="widgetUser">
                <img
                  src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt="profile"
                />
                <span className="name">Susan carol</span>
              </td>
              <td className="widgetDate">2 Jun 2021</td>
              <td className="widgetAmount">$200.00</td>
              <td className="widgetBtn">
                <Button type="Declined" />
              </td>
            </tr>
            <tr className="widgetTr">
              <td className="widgetUser">
                <img
                  src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt="profile"
                />
                <span className="name">Susan carol</span>
              </td>
              <td className="widgetDate">2 Jun 2021</td>
              <td className="widgetAmount">$200.00</td>
              <td className="widgetBtn">
                <Button type="Pending" />
              </td>
            </tr>
            <tr className="widgetTr">
              <td className="widgetUser">
                <img
                  src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  alt="profile"
                />
                <span className="name">Susan carol</span>
              </td>
              <td className="widgetDate">2 Jun 2021</td>
              <td className="widgetAmount">$200.00</td>
              <td className="widgetBtn">
                <Button type="Approved" />
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default WidgetLg;
