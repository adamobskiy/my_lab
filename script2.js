function set_cookie(name, value, expires)
{
	if (!expires)
	{
		expires = new Date();
	}
	document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() +  "; path=/";
}

function get_cookie(name)
{
	cookie_name = name + "=";
	cookie_length = document.cookie.length;
	cookie_begin = 0;
	while (cookie_begin <= cookie_length)
	{
		value_begin = cookie_begin + cookie_name.length;
		if (document.cookie.substring(cookie_begin, value_begin) == cookie_name)
		{
			var value_end = document.cookie.indexOf (";", value_begin);
			if (value_end == -1)
			{
				value_end = cookie_length;
			}
			return unescape(document.cookie.substring(value_begin, value_end));
		}
		cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
		if (cookie_begin == 0)
		{
			break;
		}
	}
	return null;
}

function Exit()
{
  var x = get_cookie ("login");
  var expires = new Date(); 
  expires.setTime(expires.getTime() + (1000 * 86400 * 365));
  set_cookie("login", "0", expires);
}