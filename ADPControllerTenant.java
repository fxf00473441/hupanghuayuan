package cn.com.hszl.app;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import cn.com.hszl.biz.ds.form.TenantForm;
import cn.com.hszl.services.intf.IADPServiceTenant;

@Controller
public class ADPControllerTenant {
	@Autowired
	private IADPServiceTenant tenantService;
	
	@RequestMapping(value = "/add_tenant",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addTenant(@RequestBody Map tenant) throws Exception {
		System.out.println("HomeController.add_tenant()");
		String tenant_name = (String)tenant.get("tenant_name");
		String tenant_address = (String)tenant.get("tenant_address");
		String tel = (String)tenant.get("tel");
		String contact_person = (String)tenant.get("contact_person");
		String phone = (String)tenant.get("phone");
		
		TenantForm tenantForm = new TenantForm();
		tenantForm.setTenantName(tenant_name);
		tenantForm.setContantPerson(contact_person);
		tenantForm.setTenantAddress(tenant_address);
		tenantForm.setPhone(phone);
		tenantForm.setTel(tel);
		tenantForm.setTenantId(UUID.randomUUID().toString());
		List<TenantForm> tenants = tenantService.listTenants();
		TenantForm response_tenant = tenantService.addTenant(tenantForm);
		System.out.println(response_tenant.getTenantId());
		JSONObject result = new JSONObject();
		result.put("status", "sucess");
		return result.toJSONString();
	}
	
	@RequestMapping(value = "/list_tenant",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listTenant() throws Exception {
		System.out.println("HomeController.add_tenant()");
		
		List<TenantForm> response_tenant = tenantService.listTenants();
		JSONArray array = new JSONArray();
		for(TenantForm tenantForm : response_tenant) {
			JSONObject result = new JSONObject();
			result.put("id", tenantForm.getTenantId());
			result.put("tenant_name", tenantForm.getTenantName());
			result.put("tenant_addr", tenantForm.getTenantAddress());
			result.put("call_by", tenantForm.getContantPerson());
			result.put("tenant_phone", tenantForm.getTel());
			result.put("phone", tenantForm.getPhone());
			array.add(result);
		}
		return array.toJSONString();
	}
}
