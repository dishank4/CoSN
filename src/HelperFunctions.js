

export function inputToCurrency(input)
{
	var currency = "";

	//Remove all commas from the input so it's just the number again
	input = input.replace(/,/g, '').replace('$','');
	currency = "$" + input.replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g, '$&,');
	//console.log("currency: ", currency);

	return currency;
}

export function currencyToFloat(currencyInput)
{
	
	var float = parseFloat(currencyInput.replace(/,/g, '').replace('$',''));
	console.log("currency To Float: ", float)
	return float;
}

export function addCommasToInput(input)
{
	var inputWithCommas = input.replace(/,/g,'').replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g, '$&,');
	console.log("addCommasToInput: ", inputWithCommas);
	return inputWithCommas;
}

export function removeCommasFromInput(input)
{
	var inputWithoutCommas = input.replace(/,/g,'');
	return parseFloat(inputWithoutCommas);
}