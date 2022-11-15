import {getByText, render,screen} from "@testing-library/react"
import IssuesList from "./IssuesList"

test( "Should render the home component",()=>{
    render(<IssuesList/>)
    const welcomeText = getByText("Request");
    expect(welcomeText).toBeInTheDocument();
})