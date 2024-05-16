export const cookies = ["UID","UserState", "Email"];
function routeToPage(route)
{
    window.location.href = route;
}
function hide(ID,CLASS)
{
    var x = document.getElementById(ID);
    if (x.className === CLASS)
    {
        x.className = "hidden";
    }
    else {
        x.className = CLASS;
    }
}
export {routeToPage, hide};