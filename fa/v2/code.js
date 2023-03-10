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

let counter = 0;

while ( words.length > 0 && counter < 30 ) {
	let index = generateRandomNumber(words.length);
	let splitedPart = words.splice(index,1);
	//console.log(splitedPart.toString());
	
	content += splitedPart.toString() + ' ' ;
	
	counter++;
}

content = content.trim();
//console.log(content);

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
		finishTournoment = Date.now();
	}	
	
}


let finish = false;





let lastButtonPress = 0 ;
let currentButtonPress = 0 ;

let startTournoment = 0;
let finishTournoment = 0;

let initializeLastButtonPrress = () => {
	lastButtonPress = Date.now()
}

let millis = 0 ;
let differenceInMillis = 0 ;

let cps = document.getElementById("cps");
let correctness = document.getElementById("correctness");
let wrongness = document.getElementById("wrongness");


let cpsArray = [];


let averageCpsArray = () => {
	let sum = 0;
	
	for(let i=0;i<cpsArray.length;i++) {
		sum += cpsArray[i];
	}
	
	return Number( sum/cpsArray.length ).toFixed(2);
}






let analyzeTiming = () => {
	if(start == false) {
		start = true;
		startTournoment = Date.now();
		initializeLastButtonPrress();
	} else {
		currentButtonPress = Date.now();
		millis = currentButtonPress - lastButtonPress ;
		lastButtonPress = currentButtonPress;
		differenceInMillis = Math.floor(millis);
		
		cpsArray.push(differenceInMillis);
		
		cps.innerHTML = ` ${averageCpsArray()} <span id="little">کاراکتر/میلی ثانیه</span>`;

		//console.log(differenceInMillis);
	}
}



let mainIndex = 0;


let start = false;



let wordsCounter = 0;
let correctsCounter = 0;
let wrongsCounter = 0;
let backspaceCounter = 0;

let result = document.getElementById('result');



let correctHits = document.getElementById('correctHits');
let wrongHits = document.getElementById('wrongHits');
let backspaceHits = document.getElementById('backspaceHits');

let time = document.getElementById('time');


let showResult = () => {
	result.style.display = 'block';
	
	correctHits.innerText = correctsCounter;
	wrongHits.innerText = wrongsCounter;
	backspaceHits.innerText = backspaceCounter;
	let seconds = Math.floor( (finishTournoment - startTournoment) / 1000 ) ;
	let milliseconds = Math.floor( Number((finishTournoment - startTournoment) / 100) ) ;
	milliseconds = `${milliseconds}`.slice(0,2);
	time.innerText = `در ${ seconds }.${ milliseconds } ثانیه به پایان رسید` ;
	
	
}




document.addEventListener( 'keydown' , (e) => {
	
	if(finish) {
		//alert('Great Job');
		showResult();
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
		backspaceCounter++;
		mainIndex--;
	} else {
		type += e.key ;
		
		wordsCounter++;
		if( content[mainIndex] == type[mainIndex] ) {
			//correct
			correctsCounter++;
			analyzeTiming();
		} else {
			wrongsCounter++;
			//wrong
		}
		
		correctness.innerText = ` ${Number((correctsCounter / wordsCounter) * 100).toFixed(2)} %`;
		wrongness.innerText = ` ${Number((wrongsCounter / wordsCounter) * 100).toFixed(2)} %`;
		
		//console.log( type[mainIndex] , content[mainIndex]  );

		mainIndex++;
		
		//console.log({type, content});
	}
	
	
	
	checkTypeEqualToContent();
	
	
	//console.log(type);
});