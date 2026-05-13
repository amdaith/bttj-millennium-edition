<%@ LANGUAGE="VBSCRIPT" %>
<%
response.buffer = true
Response.Expires = 0

Fname=Request.Form("Fname")
Name=Request.Form("Name")
Workflow=Request.Form("Fwork")
Diagram=Request.Form("Fdia")
Node=Request.Form("Fnode")
Msg=Request.Form("Msg")



MailBody=MailBody & "Name: " &Fname&"  "&Name & chr(13) & chr(10)
MailBody=MailBody & "Workflow: " &Workflow & chr(13) & chr(10)
MailBody=MailBody & "Diagram: " &Diagram & chr(13) & chr(10)
MailBody=MailBody & "Node: " &Node & chr(13) & chr(10)
MailBody=MailBody &vbCR&vbCR&Msg

set sm = Server.CreateObject ("mps.sendmail")
email=Request.Querystring("email")

feedback = sm.SendMail ("sunrise-intra@delta.ch", email, "sunrise process feedback", MailBody)

Response.Redirect("ok.htm")
%>
