<h1 align="right">Server Routes</h1>
<h3>Customer Side Routes</h3>

* **/** => Home Page => GET
* **/account/create** => Create Account Page => GET
* **/account/create** => Create Account API => POST
* **/account/login** => Login Page => GET
* **/account/login** => Login API => POST
* **/api/device** => Device Identifier => POST
* **/user/dashboard** => Dashboard Page => GET : _CSR & Protected ( Cards API )_
* **/api/cards** => Enrolled Cards => POST : _Protected_
* **/user/manage** => Manage Account => GET & POST : _Protected_
* **/api/logout** => Logout User => POST
* **/cards/share** => Share Cards => GET & POST : _Protected_
* **/api/cpu** => CPU Usage API => POST

<h3>Exceptions Handled</h3>

* **Error 404** => _PageNotFound.html_