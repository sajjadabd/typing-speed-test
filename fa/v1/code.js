let container = document.getElementById('container');


let words = [
'برای',
'میهن',
'زن',
'زندگی',
'آزادی',
'کشور',
'شجاعت',
'پرستش',
'زیبایی',
'حیران',
'ایران',
'دختر',
'پسر',
'مرد',
'آبادی',
'شاه',
'وطن',
'زینت',
'پیروزی',
'هدف',
'انسان',
'سرزمین',
'دانش',
'علم',
'کار',
'کوشش',
'پیمان',
'ناز' ,
'نشانی' ,
'هنرمند' ,
'آموزشگاه' ,
'نشان' ,
'واکاوی' ,
'فرستنده' ,
'نایاب' ,
'ویرایش' ,
'پیامک' ,
'داستان' ,
'شروع' ,
'فولاد' ,
'کنشگر' ,
'خودکار' ,
'اندیشه' ,
'پیشنهاد' ,
'تصویر' ,
'سفارش' ,
'پایه' ,
'مشغول' ,
'بوستان' ,
'چاپ' ,
'فارسی' ,
'جایگاه' ,
'بازی' ,
'کاغذی' ,
'مسابقه' ,
'چالش' ,
'موشک' ,
'کارنامه' ,
'موسیقی' ,
'گزارش' ,
'آرامش' ,
'پایگاه' ,
'تنظیمات' ,
'تغییر' ,
'نمایش' ,
'جشنواره' ,
'عکس' ,
'قالب' ,
'رایانه' ,
'مجموعه' ,
'بازار' ,
'نقشه' ,
'فلز' ,
'کلاس' ,
'ثابت' ,
'شرکت' ,
]




let generateRandomNumber = (length) => {
	return Math.floor(Math.random() * length)
}


let content = '';

while ( words.length > 0 ) {
	let index = generateRandomNumber(words.length);
	let splitedPart = words.splice(index,1);
	//console.log(splitedPart.toString());
	
	content += splitedPart.toString() + ' ' ;
}

content = content.trim();
console.log(content);

container.innerHTML = content;


let type = '';

let htmlContent = ``;

let checkTypeEqualToContent = () => {
		
	
	
	htmlContent = ``;
	
	for(let i=0;i<content.length;i++) {
		if(type[i] == null) {
			htmlContent += `<span class='default'>${content[i]}</span>`;
		} else if( type[i] == content[i] ) {
			htmlContent += `<span class='correct'>${content[i]}</span>`;
		} else {
			if( content[i] == ' ' ) {
				htmlContent += `<span class='incorrect'>_</span>`;
			} else {
				htmlContent += `<span class='incorrect'>${content[i]}</span>`;
			}
		}
	}
	
	
	
	
	container.innerHTML = htmlContent;
	
	if( type == content ) {
		finish = true;
	}	
	
}


let finish = false;

document.addEventListener( 'keydown' , (e) => {
	
	if(finish) {
		alert('Great Job');
		return;
	}
	
	console.log(e);
	
	if( e.keyCode == 13 || e.keyCode == 9 ) {
		return ;
	}
	
	if( e.key == 'Shift' ) {
		return;
	}
	
	if( e.ctrlKey || e.altKey ) {
		return;
	}
	
	
	
	if(e.key == 'Backspace') {
		//console.log('press backspace ...');
		type = type.slice(0,type.length-1);
	} else {
		type += e.key ;
		//console.log({type, content});
	}
	
	
	
	checkTypeEqualToContent();
	
	
	//console.log(type);
});